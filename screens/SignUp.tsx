import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';
import { getAuthStatus } from '../store/authSlice';
import { useAppSelector } from '../store/hooks';

export default function SignUpScreen({ navigation }: NativeStackScreenProps<any>) {
   const authStatus = useAppSelector(getAuthStatus);

   return (
      <View
         style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 28 }}
      >
         <Text>Current auth status: {authStatus.state}</Text>
         <Button onPress={() => navigation.navigate('login')} title="Go to login" />
      </View>
   );
}
