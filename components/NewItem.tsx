import { useState } from 'react';
import {
   View,
   TextInput,
   TouchableOpacity,
   Text,
   ToastAndroid,
   StyleSheet,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthToken } from '../store/authSlice';
import { addTrack } from '../store/dataSlice';

export default function NewItem() {
   const [textValue, setTextValue] = useState('');
   const dispatch = useAppDispatch();
   const authToken = useAppSelector(getAuthToken);

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
               image: null,
               link: null,
            }),
         );

         ToastAndroid.showWithGravity('saved', ToastAndroid.SHORT, ToastAndroid.CENTER);
         setTextValue('');
      } else {
         throw new Error('No token found');
      }
   };

   return (
      <View style={{ rowGap: 16 }}>
         <TextInput value={textValue} onChangeText={setTextValue} style={styles.input} />
         <TouchableOpacity style={styles.button} onPress={handleSaveText}>
            <Text style={styles.buttonText}>Save to store</Text>
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   input: {
      height: 40,
      width: 240,
      borderWidth: 1,
      padding: 10,
      borderRadius: 8,
   },
   button: {
      backgroundColor: 'purple',
      height: 42,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: 8,
      elevation: 2,
   },
   buttonText: {
      color: '#eee',
      fontSize: 20,
   },
});
