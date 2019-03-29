import { Sentry } from 'react-native-sentry';
Sentry.config('https://4fe771321ec340b786a5eb7742faacb4@sentry.io/1423787').install();

/** @format */
import './core/types';
import './workspace/config';

import {AppRegistry} from 'react-native';
import App from './workspace/main';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

