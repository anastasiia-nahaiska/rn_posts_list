import React, { useContext, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { ConnectionInfoContext } from '../../context/ConnectionInfoContext';

export const ConnectionInfo: React.FC = () => {
  const { isConnected, setIsConnected } = useContext(ConnectionInfoContext);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !isConnected ? (
    <View style={styles.root}>
      <Text style={styles.connectionMessage}>No Internet connection</Text>
      <Image
        source={require('../../images/no-network.png')}
        style={styles.connectionIcon}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingVertical: '5%',

    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  connectionMessage: {
    marginBottom: '3%',
    fontSize: 16,
    color: '#FFF',
  },
  connectionIcon: {
    width: 30,
    height: 30,
  },
});
