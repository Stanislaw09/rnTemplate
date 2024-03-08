import { DrawerScreenProps } from "@react-navigation/drawer";
import { View, Button, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAuthStatus, logoutUser } from "../store/authSlice";

function HomeScreen({ navigation }: DrawerScreenProps<any>) {
   const dispatch = useAppDispatch();
   const authStatus = useAppSelector(getAuthStatus);

   const handleLogout = () => {
      dispatch(logoutUser());
   };

   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 24 }}>
         <Text>Current auth status: {authStatus}</Text>

         <Button
            onPress={() => navigation.navigate('Notifications')}
            title="Go to notifications"
         />

         <Button
            onPress={handleLogout}
            title="Log out"
         />
      </View>
   );
}

export default HomeScreen;