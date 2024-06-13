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
import { fetchMusic, loadingSelector, musicSelector, addTrack } from '../store/dataSlice';
import ListItem from '../components/ListItem';

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
               tracks.map((track, index) => <ListItem index={index} track={track} />)
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
            <TouchableOpacity
               style={{
                  backgroundColor: 'purple',
                  height: 42,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderRadius: 8,
                  elevation: 2,
               }}
               onPress={handleSaveText}
            >
               <Text style={{ color: '#eee', fontSize: 20 }}>Save to store</Text>
            </TouchableOpacity>
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
