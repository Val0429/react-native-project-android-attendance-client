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

    hideStranger?: boolean;
}

const value: SettingsVideo = {};

export default value;