import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  handleLogOut: () => void;
};

export const Header: React.FC<Props> = React.memo(({ handleLogOut }) => (
  <View style={styles.root}>
    <TouchableOpacity onPress={handleLogOut}>
      <Text style={styles.innerText}>Log out</Text>
    </TouchableOpacity>
  </View>
));

const styles = StyleSheet.create({
  root: {
    padding: '7%',

    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: '#905BFF',
  },
  innerText: {
    textAlign: 'right',
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
