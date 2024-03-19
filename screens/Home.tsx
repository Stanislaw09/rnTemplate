import { useEffect, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
   View,
   Button,
   Text,
   TextInput,
   ToastAndroid,
   TouchableOpacity,
   ActivityIndicator,
   ScrollView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthToken, logoutUser } from '../store/authSlice';
import {
   fetchMusic,
   loadingSelector,
   musicSelector,
   addTrack,
   removeTrack,
} from '../store/dataSlice';

function HomeScreen({ navigation }: DrawerScreenProps<any>) {
   const dispatch = useAppDispatch();
   const authToken = useAppSelector(getAuthToken);
   const loadingState = useAppSelector(loadingSelector);
   const tracks = useAppSelector(musicSelector);
   const [textValue, setTextValue] = useState('');

   useEffect(() => {
      dispatch(fetchMusic());
   }, []);

   const handleLogout = () => {
      dispatch(logoutUser());
   };

   const handleSaveText = async () => {
      if (authToken) {
         if (!textValue)
            return ToastAndroid.showWithGravity(
               'Please enter a note',
               ToastAndroid.SHORT,
               ToastAndroid.CENTER,
            );

         const randomId = Math.floor(Math.random() * 10000);

         dispatch(
            addTrack({
               id: randomId,
               title: textValue,
               author: authToken,
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
         style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 24 }}
      >
         <Text style={{ fontSize: 20, marginTop: 12 }}>Welcome {authToken}</Text>

         <ScrollView style={{ marginVertical: 12 }}>
            {loadingState ? (
               <ActivityIndicator />
            ) : (
               tracks.map((track, index) => (
                  <View
                     key={index}
                     style={{
                        rowGap: 8,
                        backgroundColor: '#99335510',
                        padding: 6,
                        borderRadius: 4,
                        marginVertical: 10,
                     }}
                  >
                     <View style={{ flexDirection: 'row', columnGap: 16 }}>
                        <Text>{track.author}</Text>
                        <Text>{track.title}</Text>
                     </View>

                     <TouchableOpacity
                        onPress={() => {
                           dispatch(removeTrack(track.id));
                        }}
                     >
                        <Text style={{ color: 'violet' }}>Remove note</Text>
                     </TouchableOpacity>
                  </View>
               ))
            )}
         </ScrollView>

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

         <View style={{ columnGap: 24, marginBottom: 24, flexDirection: 'row' }}>
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
