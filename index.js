import 'react-native-gesture-handler';
<script src="http://192.168.8.100:8097"></script>;

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
