import React, {Component, ReactElement} from 'react';
import {Platform, View, Image, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, Header, Title, Segment, Tabs, Tab, TabHeading, Content, ListItem, Switch, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input, H1, Label, DatePicker, CheckBox } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { rcImages } from './../../../../resources/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { ItemDivider, ItemSwitch, ItemText, ItemPicker } from './../../../../../core/components/form';
import { StorageInstance as Storage, SettingsDigital, makeIcon } from './../../../../config';
import lang, { _ } from './../../../../../core/lang';
import { ConnectObservables } from './../../../../../helpers/storage/connect';
import { ItemDatePicker } from './../../../../../core/components/form/item-datepicker';
import { ItemDeleter } from './../../../../../core/components/form/item-deleter';
import frs, {RecognizedUser, UnRecognizedUser, UserType, Gender, IFCSSettings} from './../../../../services/frs-service';

interface IVideoSource {
    sourceId: string;
    url: string;
    ip: string;
    port: number;
    account: string;
    password: string;
    uri: string;
}

interface Props {
    settingsDigital?: SettingsDigital;
}

interface State {
    pickedDate?: Date;
    pickedHolidayMessage?: string;
    FRSConnected: boolean;
    videoSources?: IVideoSource[];
}

@ConnectObservables({
    settingsDigital: Storage.getObservable("settingsDigital"),
    lang: lang.getLangObservable()
})
export class Digital extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            pickedDate: new Date(),
            pickedHolidayMessage: "",
            FRSConnected: frs.sjLogined.getValue()
        };
    }

    private subject = Storage.getSubject("settingsDigital");
    private subscription;
    componentDidMount() {
        this.subscription = this.subject.subscribe( (value) => {
            this.setState({...value as any});
        });

        /// face recognition source
        frs.sjLogined.getValue() &&
        frs.getFCSSettings()
            .then( (data) => {
                let sources = data.reduce( (final, item, index) => {
                    if (item.video_source_type !== 'rtsp') return final;
                    final.push({
                        sourceId: item.video_source_sourceid,   ///+`_${index}`,
                        url: `rtsp://${item.video_source_username}:${item.video_source_password}@${item.video_source_ip}:${item.video_source_port}${item.video_source_rtsp_path}`,
                        ip: item.video_source_ip,
                        port: item.video_source_port,
                        account: item.video_source_username,
                        password: item.video_source_password,
                        uri: item.video_source_rtsp_path,
                    });
                    return final;
                }, []);
                /// save for first time
                if (sources.length > 0) {
                    let source = sources[0];
                    if (!this.props.settingsDigital.faceRecognitionSource) {
                        Storage.update("settingsDigital", "faceRecognitionSource", [source.sourceId]);
                    }
                }
                this.setState({
                    videoSources: sources
                });
            });
    }
    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <View>
                {/* General */}
                <ItemDivider title={_("w_General")} />
                <ItemText
                    title={_("w_CompanyName")}
                    { ...Storage.vbind(this, "settingsDigital", "companyName") }
                    icon={makeIcon(IconMaterial, "people")}
                    />
                <ItemPicker
                    title={_("m_ShowPersonRule")}
                    { ...Storage.vbind(this, "settingsDigital", "showPersonRule") }
                    items={[0, 1]}
                    labelTransform={(value) => {
                        return [_("m_PrioritizeName"), _("m_PrioritizeEmployeeID")][value];
                    }}
                    icon={makeIcon(IconMaterial, "person")}
                    />

                {/* Face Recognition Source */}
                {
                    this.state.FRSConnected && <ItemDivider title={_("m_FaceRecognitionSource")} />
                }
                {
                    this.state.FRSConnected && this.state.videoSources && (
                        this.state.videoSources.map( (source, index) => {
                            let sourceId = source.sourceId;
                            //let checked = sourceId === this.props.settingsDigital.videoSourceId;
                            let checked = this.props.settingsDigital.faceRecognitionSource.findIndex((v) => v===sourceId) >= 0;
                            return (
                                <ListItem key={index}>
                                    <CheckBox
                                        checked={checked}
                                        onPress={() => {
                                            let source = this.props.settingsDigital.faceRecognitionSource;
                                            if (checked) {
                                                let idx = source.findIndex((v) => v === sourceId);
                                                if (idx < 0) return;
                                                source.splice(idx, 1);
                                                Storage.update( "settingsDigital", "faceRecognitionSource", source);
                                            } else {
                                                let idx = source.findIndex((v) => v === sourceId);
                                                if (idx >= 0) return;
                                                Storage.update( "settingsDigital", "faceRecognitionSource", [...source, sourceId] );
                                            }
                                        }}
                                        />
                                    <Body>
                                        <Text>{source.sourceId}</Text>
                                    </Body>
                                </ListItem>
                            )
                        })
                    )
                }

                {/* Location */}
                <ItemDivider title={_("w_MyLocation")} />
                <ItemText
                    title={_("w_Latitude")}
                    { ...Storage.bind(this, "settingsDigital", "latitude") }
                    icon={makeIcon(Icon, "earth")}
                    />
                <ItemText
                    title={_("w_Longitude")}
                    { ...Storage.bind(this, "settingsDigital", "longitude") }
                    icon={makeIcon(Icon, "earth")}
                    />

                {/* Show Name */}
                <ItemDivider title={_("w_MyLocation")} />
                <ItemText
                    title={_("w_Latitude")}
                    { ...Storage.bind(this, "settingsDigital", "latitude") }
                    icon={makeIcon(Icon, "earth")}
                    />

                {/* Messages */}
                <ItemDivider title={`${_("w_GreetingMessage")} - ${_("w_Morning")} (5:00-11:00)`} />
                {
                    [1,2,3].map( (value) => {
                        return (
                            <ItemText
                                key={value}
                                title={`${_("w_Message")} ${value}`}
                                { ...Storage.bind(this, "settingsDigital", `greetingMorning${value}` as any) }
                                icon={makeIcon(Icon, "message-text")}
                                />
                        )
                    })
                }

                <ItemDivider title={`${_("w_GreetingMessage")} - ${_("w_Afternoon")} (11:00-18:00)`} />
                {
                    [1,2,3].map( (value) => {
                        return (
                            <ItemText
                                key={value}
                                title={`${_("w_Message")} ${value}`}
                                { ...Storage.bind(this, "settingsDigital", `greetingAfternoon${value}` as any) }
                                icon={makeIcon(Icon, "message-text")}
                                />
                        )
                    })
                }

                <ItemDivider title={`${_("w_GreetingMessage")} - ${_("w_Evening")} (18:00~)`} />
                {
                    [1,2,3].map( (value) => {
                        return (
                            <ItemText
                                key={value}
                                title={`${_("w_Message")} ${value}`}
                                { ...Storage.bind(this, "settingsDigital", `greetingEvening${value}` as any) }
                                icon={makeIcon(Icon, "message-text")}
                                />
                        )
                    })
                }

                <ItemDivider title={_("m_HolidayPicker")} />
                <ItemDatePicker
                    title={'Date'}
                    value={this.state.pickedDate}
                    onValueChange={(date) => this.setState({pickedDate: date})}
                    icon={makeIcon(Icon, "message-text")}
                    />
                <ItemText
                    title={_("w_Message")}
                    value={this.state.pickedHolidayMessage}
                    onValueChange={(value) => this.setState({pickedHolidayMessage: value})}
                    icon={makeIcon(Icon, "message-text")}
                    />
                <Button full rounded style={styles.create_button}
                    onPress={() => {
                        let holidays = Storage.get("settingsDigital").greetingHolidays || [];
                        holidays.push({ date: this.state.pickedDate.toISOString(), message: this.state.pickedHolidayMessage });
                        Storage.update("settingsDigital", "greetingHolidays", holidays);
                    }}
                    ><Text>{ _("m_CreateHolidayMessage") }</Text></Button>

                { (this.props.settingsDigital.greetingHolidays && this.props.settingsDigital.greetingHolidays.length > 0) && <ItemDivider title={_("m_GreetingHolidays")} /> }
                {
                    (this.props.settingsDigital.greetingHolidays || []).map( (value, index) => {
                        return (
                            <ItemDeleter
                                key={index}
                                title={new Date(value.date).toLocaleDateString("en-us")}
                                value={value.message}
                                icon={makeIcon(Icon, "message-text")}
                                onPress={() => {
                                    let holidays = [...this.props.settingsDigital.greetingHolidays];
                                    holidays.splice(index, 1);
                                    Storage.update("settingsDigital", "greetingHolidays", holidays);
                                }}
                                />
                        )
                    })
                }                

            </View>
        );
    }
}  

const styles = EStyleSheet.create({
    listitem_icon: {
        color: "white",
        fontSize: "7 rem"
    },
    listitem_icon_channel: {
        fontSize: "5.5 rem"
    },
    create_button: {
        margin: "2 rem",
        marginHorizontal: "20%",
        height: "14 rem"
    }
});