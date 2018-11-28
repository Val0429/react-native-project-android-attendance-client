import { RegisterLang } from './../../../core/lang';

@RegisterLang("en-us", "English")
export default class LangObject {
    w_Start = "Start";
}

type ClassToInterface<T> = {
    [P in keyof T]: T[P];
}
export type ILang = ClassToInterface<LangObject>;
