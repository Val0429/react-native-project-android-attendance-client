export interface SettingsDigital {
    companyName?: string;
    showPersonRule?: EShowPersonRule;
    latitude?: string;
    longitude?: string;

    faceRecognitionSource?: string[];

    greetingMorning1?: string;
    greetingMorning2?: string;
    greetingMorning3?: string;

    greetingAfternoon1?: string;
    greetingAfternoon2?: string;
    greetingAfternoon3?: string;

    greetingEvening1?: string;
    greetingEvening2?: string;
    greetingEvening3?: string;

    greetingHolidays?: IGreetingHoliday[];
}

export enum EShowPersonRule {
    Name,
    EmployeeID
}

interface IGreetingHoliday {
    date: string;
    message: string;
}

const value: SettingsDigital = {
    showPersonRule: EShowPersonRule.Name,

    latitude: "25.0375",
    longitude: "121.5637",

    greetingMorning1: "美好的一天開始！",
    greetingAfternoon1: "記得多喝水！",
    greetingEvening1: "辛苦了！"
};

export default value;