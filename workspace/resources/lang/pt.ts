import { RegisterLang } from './../../../core/lang';
import { ILang } from './en-us';

@RegisterLang("pt", "português")
export default class LangObject implements ILang {
    w_Display = "visualização";
    w_General = "geral";
    w_ModeSelection = "seleção de modo";
    w_Server = "servidor";
    w_Settings = "configurações";
    w_Start = "começar";

    m_LoginFRSFailed = "O login do FRS falhou.";
    m_ModeVideo = "Video Mode";
    m_ModeDigitalSignage = "Welcome Display Mode";
}