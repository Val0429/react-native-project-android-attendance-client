import { RegisterLang } from './../../../core/lang';

@RegisterLang("en-us", "English")
export default class LangObject {
    w_Display = "Display";
    w_General = "General";
    w_ModeSelection = "Mode Selection";
    w_Server = "Server";
    w_Settings = "Settings";
    w_Start = "Start";

    m_LoginFRSFailed = "Login into FRS failed.";
    m_ModeVideo = "Video";
    m_ModeDigitalSignage = "Welcome Display";
}

type ClassToInterface<T> = {
    [P in keyof T]: T[P];
}
export type ILang = ClassToInterface<LangObject>;
