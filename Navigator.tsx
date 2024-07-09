import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
   NativeStackNavigationProp,
   createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import LoginScreen from './screens/Login';
import { getAuthToken } from './store/authSlice';
import { useAppSelector } from './store/hooks';
import { store } from './store/store';
import HomeScreen from './screens/Home';
import NotificationsScreen from './screens/Notifications';
import SignUpScreen from './screens/SignUp';
import DetailsScreen from './screens/DetailsScreen';
import { Track } from './types/user';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export type HomeStackParamList = {
   Home: undefined;
   Details: Track;
};

export type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

function HomeStack() {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen
            name="Details"
            component={DetailsScreen}
            initialParams={{ track: undefined }}
         />
      </Stack.Navigator>
   );
}

function Navigator() {
   const authToken = useAppSelector(getAuthToken);

   return (
      <Provider store={store}>
         <NavigationContainer>
            {authToken ? (
               <Drawer.Navigator initialRouteName="HomeStack">
                  <Drawer.Screen name="HomeStack" component={HomeStack} />
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
