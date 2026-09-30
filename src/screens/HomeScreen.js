import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { DeliveryAddressContainer } from '../components/Containers/DeliveryAddressContainer';
import { ActiveOrderBanner } from '../components/Cart/ActiveOrderBanner';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.fill}>
      <ScrollView style={styles.fill}>
        <Layout level='1' style={styles.container}>
          <ActiveOrderBanner />
          <DeliveryAddressContainer />
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  container: {
    backgroundColor: '#F1F1F1',
    minHeight: '100%'
  }
});
