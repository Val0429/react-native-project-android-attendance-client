import { RegisterLang } from './../../../core/lang';
import { ILang } from './en-us';

@RegisterLang("ja-jp", "日本語")
export default class LangObject implements ILang {
    w_Display = "ディスプレイ";
    w_General = "一般";
    w_ModeSelection = "モード選択";
    w_Server = "サーバー";
    w_Settings = "設定";
    w_Start = "スタート";

    m_LoginFRSFailed = "FRSへのログインに失敗しました。";
    m_ModeVideo = "Video Mode";
    m_ModeDigitalSignage = "Welcome Display Mode";
}