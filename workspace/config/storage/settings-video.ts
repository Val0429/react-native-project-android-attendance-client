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
    faceKeepingTime?: string;
}

const value: SettingsVideo = {
    faceKeepingTime: "30"
};

export default value;