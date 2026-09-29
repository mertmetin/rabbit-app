import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { showMessage } from "react-native-flash-message";
import http from '../helpers/Http';
import { CategoriesList } from '../components/Lists/CategoriesList';
import { ProductsCards } from '../components/Cards/ProductsCards';

// A category's products, grouped by subcategory, with the aisle bar on top.
export default function ProductsScreen({ route }) {
    const category = route.params.item.id;
    const storeId = route.params.storeId;
    const [sections, setSections] = React.useState(null);
    const listRef = React.useRef(null);

    React.useEffect(() => {
        http.get(`stores/${storeId}/products`, { params: { category } })
            .then(res => setSections(res.data))
            .catch(error => {
                setSections([]);
                showMessage({ message: error.message, type: "danger" });
            });
    }, [storeId, category]);

    const scrollToSection = (sectionIndex) =>
        listRef.current?.scrollToLocation({ sectionIndex, itemIndex: 0, viewOffset: 0 });

    return (
        <View style={styles.container}>
            <CategoriesList
                category={category}
                storeId={storeId}
                subCategories={(sections || []).map(({ id, title }) => ({ id, title }))}
                onSubCategory={scrollToSection}
            />
            <ProductsCards sections={sections} listRef={listRef} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
