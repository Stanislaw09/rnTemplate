import { DrawerScreenProps } from '@react-navigation/drawer';
import { View, Text, Button } from 'react-native';
import { getAuthStatus, logoutUser } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function NotificationsScreen({ navigation }: DrawerScreenProps<any>) {
   const authStatus = useAppSelector(getAuthStatus);
   const dispatch = useAppDispatch();

   const handleLogout = () => {
      dispatch(logoutUser());
   };

   return (
      <View
         style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 28 }}
      >
         <Text>Current auth status: {authStatus.state}</Text>

         <View style={{ columnGap: 24, marginBottom: 24, flexDirection: 'row' }}>
            <Button onPress={() => navigation.navigate('Home')} title="Go to home" />

            <Button onPress={handleLogout} title="Log out" />
         </View>
      </View>
   );
}
