import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { DrawerScreenProps, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
   NativeStackScreenProps,
   createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { useState } from 'react';

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

function LoginScreen({ navigation }: NativeStackScreenProps<any>) {
   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Login Screen</Text>
         <Button onPress={() => navigation.navigate('signup')} title="Go to sign up" />
      </View>
   );
}
function SignUpScreen({ navigation }: NativeStackScreenProps<any>) {
   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Sign up Screen</Text>
         <Button onPress={() => navigation.navigate('login')} title="Go to login" />
      </View>
   );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function App() {
   const [auth, setAuth] = useState(false);

   return (
      <NavigationContainer>
         {auth ? (
            <Stack.Navigator>
               <Stack.Screen name="login" component={LoginScreen} />
               <Stack.Screen name="signup" component={SignUpScreen} />
            </Stack.Navigator>
         ) : (
            <Drawer.Navigator initialRouteName="Home">
               <Drawer.Screen name="Home" component={HomeScreen} />
               <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            </Drawer.Navigator>
         )}

         <Button title='switch auth' onPress={() => setAuth(!auth)} />
      </NavigationContainer>
   );
}

export default App;
