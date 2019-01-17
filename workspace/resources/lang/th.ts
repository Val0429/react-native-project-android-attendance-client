import { RegisterLang } from './../../../core/lang';
import { ILang } from './en-us';

@RegisterLang("th", "ไทย")
export default class LangObject implements ILang {
    w_Display = "แสดง";
    w_General = "ทั่วไป";
    w_ModeSelection = "การเลือกโหมด";
    w_Server = "เซิร์ฟเวอร์";
    w_Settings = "การตั้งค่า";
    w_Start = "เริ่มต้น";

    m_LoginFRSFailed = "เข้าสู่ระบบ FRS ล้มเหลว";
    m_ModeVideo = "Video Mode";
    m_ModeDigitalSignage = "Welcome Display Mode";
}