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

const value: SettingsAttendance = {}

export default value;