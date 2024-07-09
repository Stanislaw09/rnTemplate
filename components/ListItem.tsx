import { useCallback, useState } from 'react';
import {
   Alert,
   Image,
   LayoutAnimation,
   Linking,
   Platform,
   StyleSheet,
   Text,
   TouchableOpacity,
   UIManager,
   View,
} from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { removeTrack } from '../store/dataSlice';
import { Track } from '../types/user';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProp } from '../Navigator';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
   UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
   track: Track;
}

export default function ListItem({ track }: Props) {
   const dispatch = useAppDispatch();
   const [expanded, setExpanded] = useState(false);
   const navigation = useNavigation<HomeNavigationProp>();

   const handleOpenLink = useCallback(async () => {
      if (!track.link) return;

      const supported = await Linking.canOpenURL(track.link);

      if (supported) await Linking.openURL(track.link);
      else Alert.alert(`Don't know how to open this URL: ${track.link}`);
   }, [track.link]);

   const navigateToDetails = () => {
      navigation.navigate('Details', track);
   };

   return (
      <View style={styles.container}>
         <View style={{ height: expanded ? 84 : 48, rowGap: 8 }}>
            <View style={styles.overview}>
               {track.image ? (
                  <TouchableOpacity onPress={navigateToDetails}>
                     <Image source={{ uri: track.image }} style={styles.img} />
                  </TouchableOpacity>
               ) : undefined}

               <View style={styles.trackInfo}>
                  <TouchableOpacity onPress={navigateToDetails}>
                     <View style={styles.header}>
                        <Text>{track.author}</Text>
                        <Text>{track.title}</Text>
                     </View>
                  </TouchableOpacity>

                  <View style={styles.buttons}>
                     <TouchableOpacity
                        onPress={() => {
                           LayoutAnimation.configureNext({
                              duration: 240,
                              create: { type: 'easeInEaseOut', property: 'opacity' },
                              update: { type: 'easeInEaseOut' },
                              delete: { type: 'easeInEaseOut', property: 'opacity' },
                           });
                           setExpanded(!expanded);
                        }}
                     >
                        {expanded ? <Text>Less</Text> : <Text>More</Text>}
                     </TouchableOpacity>

                     <TouchableOpacity
                        style={styles.removeBtn}
                        onPress={() => {
                           dispatch(removeTrack(track.id));
                        }}
                     >
                        <Text style={styles.removeBtnText}>Remove note</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>

            <View>
               {track.link ? (
                  <TouchableOpacity onPress={handleOpenLink}>
                     <Text>{track.link}</Text>
                  </TouchableOpacity>
               ) : (
                  <Text>No link provided :/</Text>
               )}
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      rowGap: 8,
      backgroundColor: '#99335510',
      padding: 10,
      borderRadius: 4,
      marginVertical: 10,
      overflow: 'hidden',
   },
   overview: {
      flexDirection: 'row',
      columnGap: 8,
      height: 48,
   },
   img: {
      width: 44,
      height: 44,
      borderRadius: 2,
   },
   trackInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
      columnGap: 20,
   },
   header: { rowGap: 4 },
   buttons: {
      rowGap: 4,
      alignItems: 'flex-end',
   },
   removeBtn: { flexDirection: 'row', alignSelf: 'flex-end' },
   removeBtnText: { color: 'violet' },
});
