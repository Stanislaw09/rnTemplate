import { useEffect } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { View, Button, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthToken, logoutUser } from '../store/authSlice';
import { fetchMusic, loadingSelector, musicSelector } from '../store/dataSlice';
import ListItem from '../components/ListItem';
import NewItem from '../components/NewItem';

function HomeScreen({ navigation }: DrawerScreenProps<any>) {
   const dispatch = useAppDispatch();
   const authToken = useAppSelector(getAuthToken);
   const loadingState = useAppSelector(loadingSelector);
   const tracks = useAppSelector(musicSelector);

   useEffect(() => {
      dispatch(fetchMusic());
   }, []);

   const handleLogout = () => {
      dispatch(logoutUser());
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

         <NewItem />

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
