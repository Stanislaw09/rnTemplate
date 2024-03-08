import { createDrawerNavigator, DrawerScreenProps } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Button, Text } from "react-native";
import { Provider } from "react-redux";
import LoginScreen from "./screens/Login";
import { getAuthStatus, getAuthToken } from "./store/authSlice";
import { useAppSelector } from "./store/hooks";
import { store } from "./store/store";
import HomeScreen from "./screens/Home";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function NotificationsScreen({ navigation }: DrawerScreenProps<any>) {
   const authStatus = useAppSelector(getAuthStatus);

   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 28 }}>
         <Text>Current auth status: {authStatus}</Text>

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
   const authToken = useAppSelector(getAuthToken);

   console.log('token', authToken);

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