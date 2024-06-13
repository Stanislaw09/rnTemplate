import { useState } from 'react';
import {
   LayoutAnimation,
   Platform,
   StyleSheet,
   Text,
   TouchableOpacity,
   UIManager,
   View,
} from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { removeTrack } from '../store/dataSlice';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
   UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ListItem({
   index,
   track,
}: {
   index: number;
   track: { id: number; title: string; author: string; };
}) {
   const dispatch = useAppDispatch();
   const [expanded, setExpanded] = useState(false);

   return (
      <View key={index} style={styles.container}>
         <View style={[styles.overview, { height: expanded ? 40 : 16 }]}>
            <View style={styles.info}>
               <View style={styles.header}>
                  <Text>{track.author}</Text>
                  <Text>{track.title}</Text>
               </View>

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
                  <Text>More</Text>
               </TouchableOpacity>
            </View>

            <View>
               <Text>Hello there</Text>
            </View>
         </View>

         <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => {
               dispatch(removeTrack(track.id));
            }}
         >
            <Text style={styles.removeBtnText}>Remove note</Text>
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      rowGap: 8,
      backgroundColor: '#99335510',
      padding: 6,
      borderRadius: 4,
      marginVertical: 10,
   },
   overview: { overflow: 'hidden' },
   info: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      columnGap: 20,
   },
   header: { flexDirection: 'row', columnGap: 16 },
   removeBtn: { flexDirection: 'row' },
   removeBtnText: { color: 'violet' },
});
