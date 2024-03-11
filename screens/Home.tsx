import { useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { View, Button, Text, TextInput, ToastAndroid } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthStatus, getAuthToken, logoutUser } from '../store/authSlice';
import { setUser } from '../store/dataSlice';
import { UserState } from '../types/user';

function HomeScreen({ navigation }: DrawerScreenProps<any>) {
   const dispatch = useAppDispatch();
   const authStatus = useAppSelector(getAuthStatus);
   const authToken = useAppSelector(getAuthToken);
   const userNode = useAppSelector(state => state.root.dataSlice.node);
   const { value, user, date } = userNode;
   const userToken = useAppSelector(state => state.root.authSlice.token);
   const [currentUser, setCurrentUser] = useState<UserState>({
      node: {
         value,
         user,
         date,
      },
   });

   const handleLogout = () => {
      dispatch(logoutUser());
   };

   const handleSaveText = async () => {
      dispatch(
         setUser({
            node: {
               value: currentUser.node.value,
               user: currentUser.node.user,
               date: currentUser.node.date,
            },
         }),
      );

      ToastAndroid.showWithGravity('saved', ToastAndroid.SHORT, ToastAndroid.CENTER);
   };

   return (
      <View
         style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 48 }}
      >
         <View>
            <Text style={{ fontSize: 16 }}>Current auth status: {authStatus}</Text>
            <Text style={{ fontSize: 16 }}>Token in store: {authToken}</Text>
         </View>

         <View style={{ rowGap: 16 }}>
            <TextInput
               value={currentUser.node.value}
               onChangeText={value => {
                  setCurrentUser({
                     node: {
                        value,
                        user: userToken,
                        date: new Date(),
                     },
                  });
               }}
               style={{
                  height: 40,
                  width: 220,
                  borderWidth: 1,
                  padding: 10,
               }}
            />
            <Button onPress={handleSaveText} title="Save to store" />
         </View>

         <View style={{ rowGap: 16 }}>
            <Button
               onPress={() => navigation.navigate('Notifications')}
               title="Go to notifications"
            />

            <Button onPress={handleLogout} title="Log out" />
         </View>
      </View>
   );
}

export default HomeScreen;
