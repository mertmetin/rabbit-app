Pod::Spec.new do |s|
  s.name           = 'AddressSearch'
  s.version        = '1.0.0'
  s.summary        = 'Address suggestions as you type, from Apple Maps.'
  s.author         = 'Rabbit'
  s.homepage       = 'https://github.com/mertmetin/rabbit'
  s.license        = { :type => 'UNLICENSED' }
  s.platforms      = { :ios => '15.1' }
  s.source         = { :git => '' }
  s.static_framework = true
  s.dependency 'ExpoModulesCore'
  s.frameworks     = 'MapKit'
  s.source_files   = '**/*.swift'
end
