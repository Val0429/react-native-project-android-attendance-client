import { RegisterLang } from './../../../core/lang';
import { ILang } from './en-us';

@RegisterLang("zh-tw", "正體中文")
export default class LangObject implements ILang {
    w_Start = "開始";
}