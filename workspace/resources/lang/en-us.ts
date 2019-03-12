import { RegisterLang } from './../../../core/lang';

@RegisterLang("en-us", "English")
export default class LangObject {
    w_Display = "Display";
    w_General = "General";
    w_ModeSelection = "Mode";
    w_Server = "Server";
    w_Settings = "Settings";
    w_Start = "Start";

    m_LoginFRSFailed = "Login into FRS failed.";
    m_ModeVideo = "Video";
    m_ModeDigitalSignage = "Welcome Display";

    w_CompanyName = "Company Name";
    m_VideoSourceSelection = "Video Source Selection";
    m_VideoSourceUrl = "Video Source Url";
    m_FaceRecognitionSource = "Face Recognition Source";
    m_RestartRequired = "Warning: restart required to make change to this page take effect.";
    m_ShowStranger = "Show Stranger";
    m_MergeFaceDuration = "Merge Face Duration (seconds)";
    w_Ip = "IP";
    w_Account = "Account";
    w_Password = "Password";
    w_APIPort = "API Port";
    w_SocketPort = "Socket Port";
    w_Language = "Language";
    w_Others = "Others";
    w_About = "About";
    w_MyLocation = "My Location";
    w_Latitude = "Latitude";
    w_Longitude = "Longitude";
    w_GreetingMessage = "Greeting Message";
    w_Morning = "Morning";
    w_Afternoon = "Afternoon";
    w_Evening = "Evening";
    w_Message = "Message";
}

type ClassToInterface<T> = {
    [P in keyof T]: T[P];
}
export type ILang = ClassToInterface<LangObject>;
