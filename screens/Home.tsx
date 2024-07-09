import { useEffect } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthToken } from '../store/authSlice';
import { fetchMusic, loadingSelector, musicSelector } from '../store/dataSlice';
import ListItem from '../components/ListItem';
import NewItem from '../components/NewItem';
import { FlatList } from 'react-native-gesture-handler';

function HomeScreen({ navigation }: DrawerScreenProps<any>) {
   const dispatch = useAppDispatch();
   const authToken = useAppSelector(getAuthToken);
   const loadingState = useAppSelector(loadingSelector);
   const tracks = useAppSelector(musicSelector);

   useEffect(() => {
      dispatch(fetchMusic());
   }, []);

   return (
      <View style={styles.container}>
         <Text style={styles.text}>Welcome {authToken}</Text>

         {loadingState ? (
            <ActivityIndicator />
         ) : (
            <FlatList
               data={tracks}
               keyExtractor={track => `${track.id}`}
               renderItem={({ item }) => <ListItem track={item} />}
            />
         )}
         <NewItem />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      rowGap: 24,
      paddingVertical: 16,
   },
   text: {
      fontSize: 20,
   },
});

export default HomeScreen;
