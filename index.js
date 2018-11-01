/** @format */

import './core/types';
import {AppRegistry} from 'react-native';
import App from './workspace/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
