/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Navigation } from './navigation';
import { useEffect } from 'react';
import { ConnectionInfoContext } from './context/ConnectionInfoContext';

export const App = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ConnectionInfoContext.Provider value={{ isConnected, setIsConnected }}>
      <SafeAreaView style={styles.root}>
        {!isConnected && (
          <Text style={styles.connectionMessage}>No Internet connection</Text>
        )}

        <Navigation />
      </SafeAreaView>
    </ConnectionInfoContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: '#161827',
  },
  connectionMessage: {
    padding: '5%',
    textAlign: 'center',
    fontSize: 16,
    color: '#FFF',
  },
});
