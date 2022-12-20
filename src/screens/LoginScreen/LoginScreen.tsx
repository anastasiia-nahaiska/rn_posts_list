import React, { useCallback, useMemo, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput/CustomInput';
import { User } from '../../types/User';
import { users } from '../../users';
import { RootStackParamList } from '../../types/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const screenHeight = useMemo(() => Dimensions.get('window').height, []);
  const isButtonHidden = !email.length || !password.length;

  const handlePressButton = useCallback(() => {
    const foundUser: User | null =
      users.find(user => user.email === email) || null;

    if (!foundUser) {
      Alert.alert('', "User with this email doesn't exist", [{ text: 'Ok' }], {
        cancelable: true,
      });

      return;
    }

    if (foundUser.password !== password) {
      Alert.alert('', 'Wrong password', [{ text: 'Ok' }], {
        cancelable: true,
      });

      return;
    }

    navigation.navigate('HomeScreen');
  }, [email, navigation, password]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.root}
    >
      <View style={[styles.loginForm, { height: screenHeight * 0.6 }]}>
        <View>
          <CustomInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />

          <CustomInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>

        <CustomButton
          title="Log in"
          handlePressButton={handlePressButton}
          disabled={isButtonHidden ? true : false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: '5%',

    backgroundColor: '#161827',
  },
  loginForm: {
    justifyContent: 'space-around',
    paddingHorizontal: '5%',
    borderRadius: 20,
    backgroundColor: '#905BFF',
  },
});
