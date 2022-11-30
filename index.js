/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Router from "./router/router";
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Router);
