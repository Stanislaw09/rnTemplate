import { useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { View, Button, Text, TextInput, ToastAndroid } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthStatus, getAuthToken, logoutUser } from '../store/authSlice';
import { setText } from '../store/dataSlice';

function HomeScreen({ navigation }: DrawerScreenProps<any>) {
   const dispatch = useAppDispatch();
   const authStatus = useAppSelector(getAuthStatus);
   const authToken = useAppSelector(getAuthToken);
   const textValue = useAppSelector((state) => state.root.dataSlice.text);
   const [inputValue, setInputValue] = useState(textValue ?? '');

   const handleLogout = () => {
      dispatch(logoutUser());
   };

   const handleSaveText = async () => {
      dispatch(setText(inputValue));

      ToastAndroid.showWithGravity(
         'saved',
         ToastAndroid.SHORT,
         ToastAndroid.CENTER,
      );
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
               value={inputValue}
               onChangeText={setInputValue}
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
