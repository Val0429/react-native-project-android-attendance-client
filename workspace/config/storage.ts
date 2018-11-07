//import StoragePool from 'sync-storage';
import { AsyncStorage as StoragePool } from 'react-native';
// import StoragePool from 'react-native-sync-localstorage';
import { Component } from 'react';
import { BehaviorSubject } from 'rxjs';

export enum Modes {
    Video = 0,
    Digital = 1,
    Attendance = 2
}
export const modesText = ["Video", "Digital Signage", "Attendance Taking"];

export interface SettingsModes {
    modes?: Modes;
}

export interface SettingsVideo {
    fromFRS?: boolean;
    FRSCH?: number;
    
    fromCamera?: boolean;
    cameraIp?: string;
    cameraAccount?: string;
    cameraPassword?: string;
    cameraUri?: string;
}

export enum VideoPlayMode {
    all = 0,
    single = 1
}

export interface SettingsAttendance {
    location?: string;
    faceDetectionTime?: number;
    videoPlayMode?: VideoPlayMode;
    ip?: string;
    account?: string;
    password?: string;
    port?: number;
}

export interface SettingsDigital {
    location?: string;
}

export enum DisplayList {
    register = 0x0001,
    unregister = 0x0002,
    vip = 0x0004,
    blacklist = 0x0008
}

export interface SettingsDisplay {
    faceDisplayTime?: number;
    faceMergeTime?: number;
    displayFacePicture?: boolean;
    companyName?: string;
    textColor?: string;
    VIPColor?: string;
    blackListColor?: string;
    displayList?: number;
}

export interface SettingsFRS {
    ip?: string;
    account?: string;
    password?: string;
    apiPort?: number;
    socketPort?: number;
}

export interface SettingsDGS {
    ip?: string;
    account?: string;
    password?: string;
    apiPort?: number;
}

export interface IStorage {
    modes: SettingsModes;
    settingsVideo: SettingsVideo;
    settingsDigital: SettingsDigital;
    settingsAttendance: SettingsAttendance;
    settingsDisplay: SettingsDisplay;

    settingsFRS: SettingsFRS;
    settingsDGS: SettingsDGS;
}

export class Storage {
    private maps: { [T in keyof IStorage]?: BehaviorSubject<IStorage[T]> } = {};
    public ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor() {
        (async () => {
            let keys = await StoragePool.getAllKeys();
            keys.forEach( async (key) => {
                let data = JSON.parse(await StoragePool.getItem(key) || '{}');
                let map = this.maps[key];
                if (!map) this.maps[key] = new BehaviorSubject(data);
                else map.next(data);
            });
            this.ready.next(true);
        })();
    }

    getSubject<T extends keyof IStorage>(key: T): BehaviorSubject<IStorage[T]> {
        let sj = this.maps[key];
        if (!sj) sj = this.maps[key] = new BehaviorSubject({});
        return sj;
    }

    get<T extends keyof IStorage>(key: T): IStorage[T] {
        let sj = this.getSubject(key);
        return sj.getValue();
    }
    set<T extends keyof IStorage>(key: T, value: IStorage[T]): void {
        let sj = this.getSubject(key);
        console.log('key', key, value);
        StoragePool.setItem(key, JSON.stringify(value));
        sj.next(value);
    }
    update<T extends keyof IStorage, U extends keyof IStorage[T]>(key: T, subkey: U, value: IStorage[T][U]) {
        this.set(key, {...(this.get(key) as any), [subkey]: value});
    }

    bind<T extends keyof IStorage, U extends keyof IStorage[T]>(source: Component, key: T, data: U, validator?: Validator) {
        return {
            value: (source.state as any)[data],
            onValueChange: (value) => {
                if (validator &&
                    ((validator instanceof RegExp) && !validator.test(value)) ||
                    (validator && typeof validator === 'function' && !validator(value))
                ) {
                    source.setState({ [data]: value });
                } else
                    this.update(key, data, value);
            }
        }
    }
}

type Validator = RegExp | { (value: any): boolean };


// export class Storage {
//     private maps: { [T in keyof IStorage]?: BehaviorSubject<IStorage[T]> } = {};
    
//     getSubject<T extends keyof IStorage>(key: T): BehaviorSubject<IStorage[T]> {
//         let sj = this.maps[key];
//         console.log('start up?', key, SyncStorage.getItem(key))
//         if (!sj) sj = this.maps[key] = new BehaviorSubject(JSON.parse( SyncStorage.getItem(key) || '{}' ));
//         return sj;
//     }

//     get<T extends keyof IStorage>(key: T): IStorage[T] {
//         let sj = this.getSubject(key);
//         return sj.getValue();
//     }
//     set<T extends keyof IStorage>(key: T, value: IStorage[T]): void {
//         let sj = this.getSubject(key);
//         console.log('save?', key, value)
//         SyncStorage.setItem(key, JSON.stringify(value));
//         console.log('aftr save', key, SyncStorage.getItem(key));
//         sj.next(value);
//     }
// }

export default new Storage();