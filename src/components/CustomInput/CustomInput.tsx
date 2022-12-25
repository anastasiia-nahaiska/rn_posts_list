import React, { ReactNode } from 'react';
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';

type Props = {
  children?: ReactNode;
  value: string;
  onChangeText: (next: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export const CustomInput: React.FC<Props> = ({
  children = null,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
}) => (
  <View style={styles.container}>
    <TextInput
      value={value}
      onChangeText={newText => onChangeText(newText)}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={styles.innerText}
    />
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',

    backgroundColor: '#F8F8FA',
    borderRadius: 40,
  },
  innerText: {
    fontSize: 16,
  },
});
