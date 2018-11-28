import { RegisterLang } from './../../../core/lang';
import { ILang } from './en-us';

@RegisterLang("zh-cn", "简体中文")
export default class LangObject implements ILang {
    w_Start = "开始";
}