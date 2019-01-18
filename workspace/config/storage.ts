//import StoragePool from 'sync-storage';
import { AsyncStorage as StoragePool } from 'react-native';
// import StoragePool from 'react-native-sync-localstorage';
import { Component } from 'react';
import { BehaviorSubject } from 'rxjs';
import { Storage } from './../../helpers/storage';


import settingsModes, { SettingsModes } from './storage/settings-modes';
import settingsVideo, { SettingsVideo } from './storage/settings-video';
import settingsDigital, { SettingsDigital } from './storage/settings-digital';
import settingsAttendance, { SettingsAttendance } from './storage/settings-attendance';
import settingsDisplay, { SettingsDisplay } from './storage/settings-display';
import settingsFRS, { SettingsFRS } from './storage/settings-frs';
import settingsDGS, { SettingsDGS } from './storage/settings-dgs';
import settingsBasic, { SettingsBasic } from './storage/settings-basic';
import settingsLanguage, { SettingsLanguage } from './storage/settings-language';

export interface IStorage {
    settingsBasic: SettingsBasic;
    modes: SettingsModes;
    settingsVideo: SettingsVideo;
    settingsDigital: SettingsDigital;
    settingsAttendance: SettingsAttendance;
    settingsDisplay: SettingsDisplay;

    settingsFRS: SettingsFRS;
    settingsDGS: SettingsDGS;
    settingsLanguage: SettingsLanguage;
}

const storage: IStorage = {
    settingsBasic,
    modes: settingsModes,
    settingsVideo,
    settingsDigital,
    settingsAttendance,
    settingsDisplay,

    settingsFRS,
    settingsDGS,
    settingsLanguage,
}

const StorageInstance = new Storage(storage);
export { StorageInstance }
