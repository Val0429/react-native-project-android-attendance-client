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
import { Observable } from 'rxjs';
import frs, { UserType } from './../../../../services/frs-service';
import { StorageInstance as Storage, SettingsDigital } from './../../../../config';
import { Connect, ConnectObservables, ConnectIsEmpty } from './../../../../../helpers/storage/connect';
import lang, { defaultLang } from './../../../../../core/lang';

import Shimmer from 'react-native-shimmer';

const weatherAPI = "https://api.darksky.net/forecast/bc828de5d93bc25e236acc3e9dd9fb4f";
//const weatherLanguage = "zh-tw";
const weatherIcon = "https://darksky.net/images/weather-icons/";

const weatherMapping = {
    "zh-tw": true, "zh-cn": true,
    "en-us": "en", "ja-jp": "ja"
}

type Props = {
    settingsDigital: SettingsDigital;
    lang: string;
}

interface States {
    welcome?: string;
    incoming?: string;

    temperature?: number;
    weatherIcon?: string;
    weatherText?: string;

    weatherDescription?: string;
}

//@Connect(Storage, "settingsDigital")
@ConnectObservables({
    "settingsDigital": Storage.getObservable("settingsDigital"),
    "lang": lang.getLangObservable()
})
export class DigitalPage extends Component<Props, States> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    private subscription;
    private subscription2;
    private subscription3;
    componentDidMount() {
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
                let welcomeMap = [
                    { start: 5, end: 11, message: `Good Morning!${this.props.settingsDigital.greetingMorning && `\r\n${this.props.settingsDigital.greetingMorning}`}` },
                    { start: 11, end: 18, message: `Good Afternoon!${this.props.settingsDigital.greetingAfternoon && `\r\n${this.props.settingsDigital.greetingAfternoon}`}` },
                    { start: 18, end: 22, message: `Good Evening!${this.props.settingsDigital.greetingEvening && `\r\n${this.props.settingsDigital.greetingEvening}`}` },
                ];
                function pickWelcome() {
                    let date = new Date();
                    let hour = date.getHours();
                    let welcomeMessage = welcomeMap[welcomeMap.length-1].message;
                    for (let unit of welcomeMap) {
                        if (hour >= unit.start && hour < unit.end) {
                            welcomeMessage = unit.message;
                            break;
                        }
                    }
                    return welcomeMessage;
                }
                let welcome = pickWelcome();

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
            if (data.type === UserType.Recognized) {
                this.setState({
                    incoming: data.person_info.fullname
                });
            }
        });
        this.subscription3 = frs.livestream.subscribe();        
                
    }
    componentWillUnmount() {
        this.subscription && this.subscription.unsubscribe();
        this.subscription2 && this.subscription2.unsubscribe();
        this.subscription3 && this.subscription3.unsubscribe();
    }

    render() {
        return (
            <Container>
                <Content bounces={false} contentContainerStyle={{flex: 1}} style={[styles.content]}>
                    {/* background image */}
                    <Image source={rcImages.digital_bk} resizeMode="stretch" style={{flex: 1, width: '100%'}} />

                    <Text style={styles.welcome}>{this.state.welcome}</Text>

                    <Text style={styles.incoming}>{this.state.incoming}</Text>

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
}

const styles = EStyleSheet.create({
    content: {
        backgroundColor: "$bgColor"
    },

    welcome: {
        position: "absolute",
        top: "30%",
        left: "4%",
        color: "#9ACE32",
        fontSize: "32 rem"
    },

    incoming: {
        position: "absolute",
        top: "70%",
        left: "4%",
        color: "black",
        fontSize: "34 rem",
        fontWeight: "bold"
    },

    temperature: {
        position: "absolute",
        top: "30%",
        right: "7%",
        color: "black",
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
        color: "black",
        width: "100 rem",
        fontSize: "20 rem",
        textAlignVertical: "center",
        textAlign: "center"
    },

    weather_description: {
        position: "absolute",
        top: "70%",
        right: "3%",
        color: "black",
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
  