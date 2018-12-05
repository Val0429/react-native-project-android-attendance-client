import { RegisterLang } from './../../../core/lang';
import { ILang } from './en-us';

@RegisterLang("zh-tw", "正體中文")
export default class LangObject implements ILang {
    w_Display = "顯示";
    w_General = "一般";
    w_ModeSelection = "模式選擇";
    w_Server = "伺服器";
    w_Settings = "設定";
    w_Start = "開始";
}