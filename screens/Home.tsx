import { useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { View, Button, Text, TextInput, ToastAndroid } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthStatus, getAuthToken, logoutUser } from '../store/authSlice';
import { setNote } from '../store/dataSlice';

function HomeScreen({ navigation }: DrawerScreenProps<any>) {
   const dispatch = useAppDispatch();
   const authStatus = useAppSelector(getAuthStatus);
   const authToken = useAppSelector(getAuthToken);
   const userToken = useAppSelector(state => state.root.authSlice.token);
   const noteValue = useAppSelector(state => state.root.dataSlice.note.value);
   const [textValue, setTextValue] = useState<string>(noteValue ?? '');



   const handleLogout = () => {
      dispatch(logoutUser());
   };

   const handleSaveText = async () => {
      dispatch(
         setNote({
            value: textValue,
            user: userToken,
            date: new Date(),
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
               value={textValue}
               onChangeText={setTextValue}
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
