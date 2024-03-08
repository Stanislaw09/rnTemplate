import { createDrawerNavigator, DrawerScreenProps } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Button, Text, ToastAndroid } from "react-native";
import { Provider } from "react-redux";
import LoginScreen from "./screens/Login";
import { getAuthStatus, getAuthToken, loginUser } from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { store } from "./store/store";
import HomeScreen from "./screens/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function NotificationsScreen({ navigation }: DrawerScreenProps<any>) {
   const authStatus = useAppSelector(getAuthStatus);
   const authToken = useAppSelector(getAuthToken);

   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 28 }}>
         <Text>Current auth status: {authStatus}</Text>
         <Text>Hello {authToken}</Text>

         <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
   );
}

function SignUpScreen({ navigation }: NativeStackScreenProps<any>) {
   const authStatus = useAppSelector(getAuthStatus);

   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 28 }}>
         <Text>Current auth status: {authStatus}</Text>
         <Button onPress={() => navigation.navigate('login')} title="Go to login" />
      </View>
   );
}

function Navigator() {
   const dispatch = useAppDispatch();
   const authToken = useAppSelector(getAuthToken);

   const getToken = async () => {
      try {
         const value = await AsyncStorage.getItem('auth-token');
         if (value !== null) {
            ToastAndroid.showWithGravity(
               `${value} token found in storage!`,
               ToastAndroid.SHORT,
               ToastAndroid.CENTER,
            );

            setTimeout(() => {
               dispatch(loginUser(value));
            }, 3000);
         }
      } catch (e) {
         throw new Error('Error getting token');
      }
   };

   useEffect(() => {
      getToken();
   }, []);

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