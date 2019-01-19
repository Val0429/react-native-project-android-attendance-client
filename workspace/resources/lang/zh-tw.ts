import { RegisterLang } from './../../../core/lang';
import { ILang } from './en-us';

@RegisterLang("zh-tw", "正體中文")
export default class LangObject implements ILang {
    w_Display = "顯示";
    w_General = "一般";
    w_ModeSelection = "模式";
    w_Server = "伺服器";
    w_Settings = "設定";
    w_Start = "開始";

    m_LoginFRSFailed = "FRS登入失敗。";    
    m_ModeVideo = "影像模式";
    m_ModeDigitalSignage = "歡迎光臨模式";

    w_CompanyName = "公司名稱";
    m_VideoSourceSelection = "影像來源選擇";
    m_VideoSourceUrl = "影像來源URL";
    m_FaceRecognitionSource = "人臉辨識來源";
    m_RestartRequired = "警示: 修改本頁需要重啟App才能產生效果。";
    m_ShowStranger = "顯示陌生人";
    m_MergeFaceDuration = "合併人臉持續時間 (秒)";
    w_Ip = "IP";
    w_Account = "帳號";
    w_Password = "密碼";
    w_APIPort = "API Port";
    w_SocketPort = "Socket Port";
    w_Language = "語言";
    w_Others = "其他";
    w_About = "關於";
    w_MyLocation = "我的位置";
    w_Latitude = "緯度";
    w_Longitude = "經度";
    w_GreetingMessage = "歡迎訊息";
    w_Morning = "早上";
    w_Afternoon = "中午";
    w_Evening = "晚上";
}