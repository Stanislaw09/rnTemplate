import * as React from 'react';
import { Button, View } from 'react-native';
import { DrawerScreenProps, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }: DrawerScreenProps<any>) {
   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Button
            onPress={() => navigation.navigate('Notifications')}
            title="Go to notifications"
         />
      </View>
   );
}

function NotificationsScreen({ navigation }: DrawerScreenProps<any>) {
   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
   );
}

const Drawer = createDrawerNavigator();

function App() {
   return (
      <NavigationContainer>
         <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
         </Drawer.Navigator>
      </NavigationContainer>
   );
}

export default App;
