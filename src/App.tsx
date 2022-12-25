/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Navigation } from './navigation';
import { ConnectionInfoContextProvider } from './context/ConnectionInfoContext';
import { ConnectionInfo } from './components/ConnectionInfo';

export const App = () => {
  return (
    <ConnectionInfoContextProvider>
      <SafeAreaView style={styles.root}>
        <ConnectionInfo />

        <Navigation />
      </SafeAreaView>
    </ConnectionInfoContextProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: '#161827',
  },
});
