import React from 'react';
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';

type Props = {
  value: string;
  onChangeText: (next: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export const CustomInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={newText => onChangeText(newText)}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.innerText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
