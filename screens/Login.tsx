import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { View, Text, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthStatus, loginUser } from '../store/authSlice';

function LoginScreen({ navigation }: NativeStackScreenProps<any>) {
   const dispatch = useAppDispatch();
   const authStatus = useAppSelector(getAuthStatus);

   const logIn = () => {
      dispatch(loginUser(69));
   };

   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 20 }}>
         <Text>Login Screen</Text>
         <Text>Current auth status: {authStatus}</Text>

         <View style={{ marginVertical: 40 }}>
            <Button onPress={logIn} title="Log in" />
         </View>

         <Button onPress={() => navigation.navigate('signup')} title="Go to sign up" />
      </View>
   );
}

export default LoginScreen;
