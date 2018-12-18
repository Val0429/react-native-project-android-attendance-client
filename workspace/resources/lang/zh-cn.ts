import { RegisterLang } from './../../../core/lang';
import { ILang } from './en-us';

@RegisterLang("zh-cn", "简体中文")
export default class LangObject implements ILang {
    w_Display = "显示";
    w_General = "一般";
    w_ModeSelection = "模式选择";
    w_Server = "服务器";
    w_Settings = "设置";
    w_Start = "开始";

    m_LoginFRSFailed = "FRS登入失败。";    
}
