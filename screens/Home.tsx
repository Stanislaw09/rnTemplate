import { useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
   View,
   Button,
   Text,
   TextInput,
   ToastAndroid,
   TouchableOpacity,
   ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthStatus, getAuthToken, logoutUser } from '../store/authSlice';
import { addNote, loadingSelector, removeNote } from '../store/dataSlice';

function HomeScreen({ navigation }: DrawerScreenProps<any>) {
   const dispatch = useAppDispatch();
   const authStatus = useAppSelector(getAuthStatus);
   const authToken = useAppSelector(getAuthToken);
   const notes = useAppSelector(state => state.root.dataSlice.notes);
   const loadingState = useAppSelector(loadingSelector);
   const [textValue, setTextValue] = useState('');

   const handleLogout = () => {
      dispatch(logoutUser());
   };

   const handleSaveText = async () => {
      if (authToken) {
         dispatch(
            addNote({
               value: textValue,
               user: authToken,
               date: new Date(),
            }),
         );

         ToastAndroid.showWithGravity('saved', ToastAndroid.SHORT, ToastAndroid.CENTER);
         setTextValue('');
      } else {
         throw new Error('No token found');
      }
   };

   return (
      <View
         style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 48 }}
      >
         <View>
            <Text style={{ fontSize: 16 }}>Current auth status: {authStatus.state}</Text>
            <Text style={{ fontSize: 16 }}>Token in store: {authToken}</Text>
         </View>

         <View style={{ rowGap: 16 }}>
            {loadingState ?
               <ActivityIndicator /> :
               notes.map((note, index) => (
                  <View
                     key={index}
                     style={{
                        rowGap: 8,
                        backgroundColor: '#99335510',
                        padding: 6,
                        borderRadius: 4,
                     }}
                  >
                     <View style={{ flexDirection: 'row', columnGap: 16 }}>
                        <Text>{note.user}</Text>
                        <Text>{note.date.toISOString()}</Text>
                     </View>

                     <Text>{note.value}</Text>

                     <TouchableOpacity
                        onPress={() => {
                           dispatch(removeNote(note.value));
                        }}
                     >
                        <Text style={{ color: 'violet' }}>Remove note</Text>
                     </TouchableOpacity>
                  </View>
               ))}
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
