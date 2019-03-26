import React, {Component, ReactElement} from 'react';
import {Platform, View, Image, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { rcImages } from '../../../../resources/images';
import Iconion from 'react-native-vector-icons/Ionicons';
import './../../../../services/frs-service';
import { OutlineElement } from '../outline-element';
import { Face } from '../face';
import { Observable, Subject } from 'rxjs';
import frs, { UserType } from './../../../../services/frs-service';
import { StorageInstance as Storage, SettingsDigital, EShowPersonRule } from './../../../../config';
import { Connect, ConnectObservables, ConnectIsEmpty } from './../../../../../helpers/storage/connect';
import lang, { defaultLang, _ } from './../../../../../core/lang';

import Shimmer from 'react-native-shimmer';
import moment from 'moment';
import 'moment/min/locales';

const weatherAPI = "https://api.darksky.net/forecast/bc828de5d93bc25e236acc3e9dd9fb4f";
//const weatherLanguage = "zh-tw";
const weatherIcon = "https://darksky.net/images/weather-icons/";

const weatherMapping = {
    "zh-tw": true, "zh-cn": true,
    "en-us": "en", "ja-jp": "ja",
    "th": "en", "id-id": "id",
    "es": true, "pt": true,
}

type Props = {
    settingsDigital: SettingsDigital;
    now: { value: Date };
    lang: string;
}

interface States {
    welcome?: string;
    incoming?: string;

    temperature?: number;
    weatherIcon?: string;
    weatherText?: string;

    weatherDescription?: string;
    showGreeting: boolean;
}

@ConnectObservables({
    "settingsDigital": Storage.getObservable("settingsDigital"),
    "now": Observable.timer(0, 1000).map( () => ({value: new Date()}) ),
    "lang": lang.getLangObservable()
})
export class DigitalPage extends Component<Props, States> {
    private sjTimer = new Subject();    
    constructor(props) {
        super(props);
        this.state = {
            showGreeting: false
        };
    }

    private subscription;
    private subscription2;
    private subscription3;
    private subscription4;
    componentDidMount() {
        this.subscription4 = this.sjTimer
            .switchMap( () => Observable.of(true).delay(30*1000) )
            .subscribe( (data) => {
                this.setState({showGreeting: false});
            });

        this.subscription = Observable.timer(0, 10*60*1000)
            .subscribe( async () => {
                if (ConnectIsEmpty(this.props.lang)) return;
                function doWeatherMapping(lang: string) {
                    let result = weatherMapping[lang];
                    if (!result) return weatherMapping[defaultLang];
                    if (result === true) return lang;
                    return result;
                }
                let weatherLanguage = doWeatherMapping(this.props.lang);

                let url = `${weatherAPI}/${this.props.settingsDigital.latitude},${this.props.settingsDigital.longitude}?exclude=hourly&units=ca&lang=${weatherLanguage}`;
                let result = await (await fetch(url, {
                    method: 'GET'
                })).json();

                /// welcome
                let welcome = this.generateWelcomeMessage();

                /// temperature
                let temperature = result.currently.temperature;

                /// weather icon
                let weatherIcon = `https://darksky.net/images/weather-icons/${result.currently.icon}.png`;

                /// weather text
                let weatherText = result.currently.summary;

                /// weather description
                let weatherDescription = result.daily.summary;

                this.setState({
                    welcome,
                    temperature,
                    weatherText,
                    weatherIcon,
                    weatherDescription
                })

            } );

        this.subscription2 = frs.sjLiveFace.subscribe( (data) => {
            /// filter Face Recognition Source
            let frSource = this.props.settingsDigital.faceRecognitionSource;
            if (frSource && frSource.length > 0) {
                if (frSource.indexOf(data.channel) < 0) return;
            } /// if not set, default to show all

            if (data.type === UserType.Recognized) {
                let name = this.props.settingsDigital.showPersonRule === EShowPersonRule.Name ?
                    data.person_info.fullname || data.person_info.employeeno :
                    data.person_info.employeeno || data.person_info.fullname;

                /// make message constantly if name not changing
                let result: any = {
                    incoming: name,
                    showGreeting: true
                };
                if (name !== this.state.incoming) result.welcome = this.generateWelcomeMessage();
                this.setState(result);

                // this.setState({
                //     welcome: this.generateWelcomeMessage(),
                //     incoming: name,
                //     showGreeting: true
                // });
                this.sjTimer.next();
            }
        });
        this.subscription3 = frs.livestream.subscribe();
    }
    componentWillUnmount() {
        this.subscription && this.subscription.unsubscribe();
        this.subscription2 && this.subscription2.unsubscribe();
        this.subscription3 && this.subscription3.unsubscribe();
        this.subscription4 && this.subscription4.unsubscribe();
    }

    getDefaultPage() {
        return (
            <>
                <View style={styles.default_title}>
                    <Text style={styles.default_title_text}>{this.props.settingsDigital.companyName}</Text>
                </View>
                <View style={styles.default_box}>
                    {
                        this.props.now.value && (
                            <>
                                <Text style={styles.default_box_time}>{this.getHourString(this.props.now.value)}</Text>
                                <Text style={styles.default_box_date}>{this.getDateString(this.props.now.value)}</Text>
                            </>
                        )
                    }
                </View>
            </>
        )
    }

    getWelcomePage() {
        return (
            <>
                <Text style={styles.welcome}>{this.state.welcome}</Text>
                <Text style={styles.incoming}>{this.state.incoming && `Hi, ${this.state.incoming}`}</Text>
            </>
        );
    }

    render() {
        return (
            <Container>
                <Content bounces={false} contentContainerStyle={{flex: 1}} style={[styles.content]}>
                    {/* background image */}
                    <Image source={rcImages.digital_bk} resizeMode="stretch" style={{flex: 1, width: '100%'}} />

                    {
                        this.state.showGreeting ? this.getWelcomePage() : this.getDefaultPage()
                    }

                    { /* todo remove */ }
                    {/* { this.getWelcomePage() } */}

                    <Text style={styles.temperature}>{this.state.temperature ? `${Math.floor(this.state.temperature)}°` : ''}</Text>

                    <Text numberOfLines={1} style={styles.weather_text}>{this.state.weatherText}</Text>

                    <Text style={styles.weather_description}>{this.state.weatherDescription}</Text>

                    { this.state.weatherIcon && <Image resizeMode="contain" source={{uri: this.state.weatherIcon}} style={styles.weather_icon} /> }

                    {/* Setup */}
                    <TouchableOpacity style={styles.setup_icon_touchable} activeOpacity={0.7} onPress={() => Actions.push('setup')}>
                        <Iconion name='md-cog' style={styles.setup_icon} />
                    </TouchableOpacity>

                </Content>
            </Container>
        );
    }

    private generateWelcomeMessage(): string {
        const welcomeMap = [
            { start: 5, end: 11, ref: 'greetingMorning', message: `Good Morning!` },
            { start: 11, end: 18, ref: 'greetingAfternoon', message: `Good Afternoon!` },
            { start: 18, end: 22, ref: 'greetingEvening', message: `Good Evening!` },
        ];

        /// generate
        let date = new Date();
        let year = date.getFullYear();
        let day = date.getDate();
        let hour = date.getHours();
        let welcomeState = welcomeMap[welcomeMap.length-1];
        let message;
        for (let unit of welcomeMap) {
            if (hour >= unit.start && hour < unit.end) {
                welcomeState = unit;
                break;
            }
        }

        // check holidays first
        let holidays = this.props.settingsDigital.greetingHolidays;
        if (holidays) {
            for (let holiday of holidays) {
                let curdate = new Date(holiday.date);
                let curyear = curdate.getFullYear();
                let curday = curdate.getDate();
                if (curyear !== year || curday !== day) continue;
                message = holiday.message;
                break;
            }
        }
        
        /// fall back to daily message
        if (!message) {
            /// generate message
            let messages = [1,2,3].reduce( (final, value) => {
                let msg = this.props.settingsDigital[`${welcomeState.ref}${value}`];
                msg && (final.push(msg));
                return final;
            }, []);
            message = (messages.length > 0 ? messages[Math.floor(Math.random()*messages.length)] : '');
        }

        return `${welcomeState.message}\r\n` + message;
    }

    private getHourString(date: Date | number) {
        if (typeof date === 'number') date = new Date(date);
        return `${this.pad(date.getHours(), 2)}:${this.pad(date.getMinutes(), 2)}:${this.pad(date.getSeconds(), 2)}`;
    }
    private getDateString(date: Date | number) {
        if (ConnectIsEmpty(this.props.lang)) return;
        if (typeof date === 'number') date = new Date(date);
        /// to extract first part of lang
        let lang = this.props.lang;
        if (lang.indexOf("zh") < 0) {
            let regex = /^([a-z]+)\-?/i;
            lang = lang.match(regex)[1];
        }
        moment.locale(lang);
        return moment().format('ll dddd');
    }    
    private pad(n, width, z?) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
}

const styles = EStyleSheet.create({
    content: {
        backgroundColor: "$bgColor"
    },

    incoming: {
        position: "absolute",
        top: "28%",
        left: "4%",
        color: "#9ACE32",
        fontSize: "34 rem",
        fontWeight: "bold"
    },

    welcome: {
        position: "absolute",
        top: "48%",
        left: "4%",
        color: "white",
        fontSize: "32 rem",
    },

    // welcome: {
    //     position: "absolute",
    //     top: "30%",
    //     left: "4%",
    //     color: "#9ACE32",
    //     fontSize: "32 rem"
    // },

    // incoming: {
    //     position: "absolute",
    //     top: "68%",
    //     left: "4%",
    //     color: "black",
    //     fontSize: "34 rem",
    //     fontWeight: "bold"
    // },

    default_title: {
        position: "absolute",
        top: "17%",
        left: "4%",
        width: "50%",
        height: "28%",
        justifyContent: "center",
        textAlign: "center",
    },
    default_title_text: {
        fontSize: "28 rem",
        color: "#9ACE32",
        justifyContent: "center",
        textAlign: "center"
    },

    default_box: {
        position: "absolute",
        bottom: "12%",
        left: "4%",
        width: "50%",
        height: "36%",
        justifyContent: "center",
        textAlign: "center",
    },
    // default_box_time: {
    //     justifyContent: "center",
    //     textAlign: "center",
    //     fontSize: "36 rem",
    //     fontWeight: "bold"
    // },
    // default_box_date: {
    //     justifyContent: "center",
    //     textAlign: "center",
    //     fontSize: "16 rem"
    // },

    default_box_time: {
        justifyContent: "center",
        textAlign: "center",
        fontSize: "36 rem",
        fontWeight: "bold",
        color: "white"
    },
    default_box_date: {
        justifyContent: "center",
        textAlign: "center",
        fontSize: "16 rem",
        color: "white"
    },

    temperature: {
        position: "absolute",
        top: "30%",
        right: "7%",
        // color: "black",
        color: "white",
        fontSize: "20 rem",
        fontWeight: "bold"
    },

    weather_icon: {
        position: "absolute",
        top: "36%",
        right: "13%",
        width: "50 rem",
        height: "50 rem"
    },

    weather_text: {
        position: "absolute",
        top: "55%",
        right: "6.1%",
        // color: "black",
        color: "white",
        width: "100 rem",
        fontSize: "20 rem",
        textAlignVertical: "center",
        textAlign: "center"
    },

    weather_description: {
        position: "absolute",
        top: "70%",
        right: "3%",
        // color: "black",
        color: "white",
        fontSize: "8 rem",
        width: "130 rem",
        textAlign: "center",
        fontStyle: "italic"
    },

    setup_icon_touchable: {
        position: "absolute",
        right: "5 rem",
        bottom: "8 rem"
    },
    setup_icon: {
        fontSize: "24 rem",
        color: "#AAAABB",
    }

});
  