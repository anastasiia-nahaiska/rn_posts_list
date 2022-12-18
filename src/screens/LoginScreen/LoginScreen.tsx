import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput/CustomInput';
import { User } from '../../types/User';
import { users } from '../../users';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPasswors] = useState('');

  const screenHeight = Dimensions.get('window').height;

  const handlePressButton = () => {
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
  };

  const isButtonHidden = !email.length || !password.length;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.root}
    >
      <View style={[styles.loginForm, { height: screenHeight * 0.4 }]}>
        <View>
          <CustomInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />

          <CustomInput
            value={password}
            onChangeText={setPasswors}
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
    padding: '10%',

    backgroundColor: '#161827',
  },
  loginForm: {
    justifyContent: 'space-between',
  },
});
