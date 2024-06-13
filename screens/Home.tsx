import { useEffect } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthToken } from '../store/authSlice';
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

   return (
      <View
         style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 24, paddingVertical: 16 }}
      >
         <Text style={{ fontSize: 20 }}>Welcome {authToken}</Text>

         <ScrollView style={{ marginVertical: 12 }}>
            {loadingState ? (
               <ActivityIndicator />
            ) : (
               tracks.map((track, index) => <ListItem index={index} track={track} />)
            )}
         </ScrollView>

         <NewItem />
      </View>
   );
}

export default HomeScreen;
