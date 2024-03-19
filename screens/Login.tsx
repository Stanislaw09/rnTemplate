import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { View, Text, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthStatus, loginUser } from '../store/authSlice';

function LoginScreen({ navigation }: NativeStackScreenProps<any>) {
   const dispatch = useAppDispatch();
   const authStatus = useAppSelector(getAuthStatus);

   const logIn = (user: string) => {
      dispatch(loginUser(user));
   };

   return (
      <View
         style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 16 }}
      >
         <Text style={{ fontSize: 20 }}>Login Screen</Text>
         <Text style={{ fontSize: 16 }}>Current auth status: {authStatus.state}</Text>

         <View style={{ marginVertical: 40, rowGap: 16 }}>
            <Button onPress={() => logIn('takeda')} title="Log in as Takeda Shingen" />
            <Button onPress={() => logIn('uesugi')} title="Log in as Uesugi Kenshin" />
         </View>

         <Button onPress={() => navigation.navigate('signup')} title="Go to sign up" />
      </View>
   );
}

export default LoginScreen;
