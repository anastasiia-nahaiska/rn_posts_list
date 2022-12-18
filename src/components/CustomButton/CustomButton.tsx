/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  handlePressButton: () => void;
  title: string;
  disabled?: boolean;
};

export const CustomButton: React.FC<Props> = ({
  handlePressButton,
  title,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePressButton}
      style={[styles.appButtonContainer, { opacity: disabled ? 0 : 1 }]}
    >
      <Text style={[styles.appButtonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    paddingVertical: 30,
    width: '100%',

    backgroundColor: '#905BFF',
    borderRadius: 40,
    elevation: 8,
  },
  appButtonText: {
    alignSelf: 'center',

    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
