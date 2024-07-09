import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Image, StyleSheet } from 'react-native';
import { HomeStackParamList } from '../Navigator';

export default function DetailsScreen({
   route,
   navigation,
}: NativeStackScreenProps<HomeStackParamList, 'Details'>) {
   const track = route.params;

   return (
      <View style={styles.container}>
         <Text style={styles.title}>{track.title}</Text>

         <Image source={{ uri: track.image ?? '' }} style={styles.image} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      rowGap: 20,
      padding: 20
   },
   title: {
      fontSize: 24,
   },
   image: {
      width: 200,
      height: 200
   }
});
