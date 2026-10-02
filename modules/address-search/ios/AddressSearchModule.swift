import ExpoModulesCore
import MapKit

// Address suggestions as you type (Apple Maps' completer, addresses only,
// biased to the Ottawa area), and the full address for a chosen suggestion.
public class AddressSearchModule: Module {
  private let searcher = Searcher()

  public func definition() -> ModuleDefinition {
    Name("AddressSearch")

    AsyncFunction("search") { (query: String, promise: Promise) in
      DispatchQueue.main.async { self.searcher.search(query, promise: promise) }
    }

    AsyncFunction("resolve") { (title: String, subtitle: String, promise: Promise) in
      let request = MKLocalSearch.Request(naturalLanguageQuery: "\(title), \(subtitle)")
      request.resultTypes = .address
      request.region = Searcher.ottawa
      MKLocalSearch(request: request).start { response, error in
        guard let place = response?.mapItems.first?.placemark else {
          promise.reject("NOT_FOUND", error?.localizedDescription ?? "Address not found.")
          return
        }
        let street = [place.subThoroughfare, place.thoroughfare].compactMap { $0 }.joined(separator: " ")
        promise.resolve([
          "address_line_1": street.isEmpty ? title : street,
          "city": place.locality ?? "",
          "zone_code": place.administrativeArea ?? "",
          "postal_code": place.postalCode ?? "",
          "latitude": place.coordinate.latitude,
          "longitude": place.coordinate.longitude,
        ])
      }
    }
  }
}

// MKLocalSearchCompleter answers through a delegate; each new query replaces
// the previous one, whose promise gets the latest results.
final class Searcher: NSObject, MKLocalSearchCompleterDelegate {
  static let ottawa = MKCoordinateRegion(
    center: CLLocationCoordinate2D(latitude: 45.4215, longitude: -75.6972),
    latitudinalMeters: 60_000, longitudinalMeters: 60_000
  )
  private let completer = MKLocalSearchCompleter()
  private var pending: Promise?

  override init() {
    super.init()
    completer.delegate = self
    completer.resultTypes = .address
    completer.region = Searcher.ottawa
  }

  func search(_ query: String, promise: Promise) {
    pending?.resolve([])
    let text = query.trimmingCharacters(in: .whitespaces)
    if text.count < 3 {
      promise.resolve([])
      return
    }
    pending = promise
    completer.queryFragment = text
  }

  func completerDidUpdateResults(_ completer: MKLocalSearchCompleter) {
    pending?.resolve(completer.results.prefix(6).map { ["title": $0.title, "subtitle": $0.subtitle] })
    pending = nil
  }

  func completer(_ completer: MKLocalSearchCompleter, didFailWithError error: Error) {
    pending?.resolve([])
    pending = nil
  }
}
