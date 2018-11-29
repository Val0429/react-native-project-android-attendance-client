import { RegisterLang } from './../../../core/lang';
import { ILang } from './en-us';

@RegisterLang("ja-jp", "日本語")
export default class LangObject implements ILang {
    w_Start = "スタート";
}