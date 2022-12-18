import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  handleLogOut: () => void;
};

export const Header: React.FC<Props> = ({ handleLogOut }) => (
  <View style={styles.root}>
    <Pressable onPress={handleLogOut}>
      <Text style={styles.innerText}>Log out</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  root: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // left: 0,
    // zIndex: 1,
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
