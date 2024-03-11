import { useEffect, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { View, Button, Text, TextInput, ToastAndroid } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthStatus, getAuthToken, logoutUser } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }: DrawerScreenProps<any>) {
   const dispatch = useAppDispatch();
   const authStatus = useAppSelector(getAuthStatus);
   const authToken = useAppSelector(getAuthToken);
   const [text, setText] = useState('');

   const readTextFromStorage = async () => {
      try {
         const jsonValue = await AsyncStorage.getItem('text');

         if (jsonValue !== null) {
            const parsed = JSON.parse(jsonValue);

            setText(parsed[authToken ?? '']);

         }
      } catch (e) {
         throw new Error('Error reading text from storage');
      }
   };

   useEffect(() => {
      readTextFromStorage();
   }, []);

   const handleLogout = () => {
      dispatch(logoutUser());
   };

   const handleSaveText = async () => {
      if (authToken) {
         try {
            const currentValue = await AsyncStorage.getItem('text');
            let parsedValue = JSON.parse(currentValue || '{}');
            parsedValue[authToken] = text;

            const jsonValue = JSON.stringify(parsedValue);

            await AsyncStorage.setItem('text', jsonValue);

            ToastAndroid.showWithGravity('Saved!', ToastAndroid.SHORT, ToastAndroid.CENTER);
         } catch (e) {
            throw new Error('Error saving text to storage');
         }
      }
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
               style={{
                  height: 40,
                  width: 220,
                  borderWidth: 1,
                  padding: 10,
               }}
               onChangeText={setText}
               value={text}
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
