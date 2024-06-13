import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
   createNativeStackNavigator,
   NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { View, Button, Text } from 'react-native';
import { Provider } from 'react-redux';
import LoginScreen from './screens/Login';
import { getAuthToken } from './store/authSlice';
import { useAppSelector } from './store/hooks';
import { store } from './store/store';
import HomeScreen from './screens/Home';
import NotificationsScreen from './screens/Notifications';
import SignUpScreen from './screens/SignUp';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Navigator() {
   const authToken = useAppSelector(getAuthToken);

   return (
      <Provider store={store}>
         <NavigationContainer>
            {authToken ? (
               <Drawer.Navigator initialRouteName="Home">
                  <Drawer.Screen name="Home" component={HomeScreen} />
                  <Drawer.Screen name="Notifications" component={NotificationsScreen} />
               </Drawer.Navigator>
            ) : (
               <Stack.Navigator>
                  <Stack.Screen name="login" component={LoginScreen} />
                  <Stack.Screen name="signup" component={SignUpScreen} />
               </Stack.Navigator>
            )}
         </NavigationContainer>
      </Provider>
   );
}

export default Navigator;
