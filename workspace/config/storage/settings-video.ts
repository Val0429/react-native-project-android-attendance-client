export interface SettingsVideo {
    fromFRS?: boolean;
    FRSCH?: number;
    
    fromCamera?: boolean;
    cameraIp?: string;
    cameraPort?: string;
    cameraAccount?: string;
    cameraPassword?: string;
    cameraChannelId?: string;
    cameraUri?: string;
}

const value: SettingsVideo = {};

export default value;