/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Navigation } from './src/navigation';
import { useEffect, useState } from 'react';

export const App = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.isInternetReachable) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });

    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {!isConnected && (
        <Text style={styles.connectionMessage}>No Internet connection</Text>
      )}

      <Navigation />
    </SafeAreaView>
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
