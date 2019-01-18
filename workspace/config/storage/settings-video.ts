
export interface SettingsVideo {
    fromFRS?: boolean;
    FRSCH?: number;

    companyName?: string;
    videoSourceId?: string;
    videoSourceUrl?: string;
    faceRecognitionSource?: string[];
    
    showStranger?: boolean;
    mergeFaceDuration?: string;
    
    /// to do remove ///
    fromCamera?: boolean;
    cameraIp?: string;
    cameraPort?: string;
    cameraAccount?: string;
    cameraPassword?: string;
    cameraChannelId?: string;
    cameraUri?: string;

    hideStranger?: boolean;
    faceKeepingTime?: string;   /// merge face duration
    /// to do remove ///

}

const value: SettingsVideo = {
    mergeFaceDuration: "30"
};

export default value;