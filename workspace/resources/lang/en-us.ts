import { RegisterLang } from './../../../core/lang';

@RegisterLang("en-us", "English")
export default class LangObject {
    w_Display = "Display";
    w_General = "General";
    w_ModeSelection = "Mode Selection";
    w_Server = "Server";
    w_Settings = "Settings";
    w_Start = "Start";
}

type ClassToInterface<T> = {
    [P in keyof T]: T[P];
}
export type ILang = ClassToInterface<LangObject>;
