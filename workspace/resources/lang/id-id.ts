import { RegisterLang } from './../../../core/lang';
import { ILang } from './en-us';

@RegisterLang("id-id", "Bahasa indonesia")
export default class LangObject implements ILang {
    w_Display = "Tampilan";
    w_General = "Umum";
    w_ModeSelection = "Mode pilihan";
    w_Server = "Server";
    w_Settings = "Pengaturan";
    w_Start = "Mulai";
}