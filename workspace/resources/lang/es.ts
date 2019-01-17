import { RegisterLang } from './../../../core/lang';
import { ILang } from './en-us';

@RegisterLang("es", "español")
export default class LangObject implements ILang {
    w_Display = "visualización";
    w_General = "general";
    w_ModeSelection = "selección de modo";
    w_Server = "servidor";
    w_Settings = "ajustes";
    w_Start = "comienzo";

    m_LoginFRSFailed = "El inicio de sesión de FRS falló.";
    m_ModeVideo = "Video Mode";
    m_ModeDigitalSignage = "Welcome Display Mode";
}