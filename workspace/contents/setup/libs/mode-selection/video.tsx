import React, {Component, ReactElement} from 'react';
import {Platform, View, Image, TouchableOpacity, StyleProp, ViewStyle, Settings} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, Header, Title, Segment, Tabs, Tab, TabHeading, Content, ListItem, Switch, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input, H1, Label } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { rcImages } from './../../../../resources/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import { StorageInstance as Storage, SettingsVideo, makeIcon } from './../../../../config';
import { ItemDivider, ItemSwitch, ItemText, ItemColor } from './../../../../../core/components/form';


interface Props {
}

export class Video extends Component<Props, Partial<SettingsVideo>> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    private subject = Storage.getSubject("settingsVideo");
    private subscription;
    componentDidMount() {
        this.subscription = this.subject.subscribe( (value) => {
            this.setState({...value});
        });
    }
    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <Container>
                <Button warning full><Text uppercase={false}>Warning: restart required to make change to this page take effect.</Text></Button>

                {/* RTSP Source */}
                <ItemDivider title="RTSP Source" />
                <ItemText
                    title="IP Address"
                    { ...Storage.bind(this, "settingsVideo", "cameraIp") }
                    icon={makeIcon(Icon, "access-point-network")}                                        
                    />
                <ItemText
                    title="Port"
                    { ...Storage.bind(this, "settingsVideo", "cameraPort") }
                    icon={makeIcon(Icon, "folder-network")}                                        
                    />
                <ItemText
                    title="Account"
                    { ...Storage.bind(this, "settingsVideo", "cameraAccount") }
                    icon={makeIcon(Icon, "account")}                                        
                    />
                <ItemText
                    title="Password"
                    { ...Storage.bind(this, "settingsVideo", "cameraPassword") }
                    secureTextEntry={true}
                    icon={makeIcon(Icon, "onepassword")}                                        
                    />
                <ItemText last
                    title="URI"
                    { ...Storage.bind(this, "settingsVideo", "cameraUri") }
                    icon={makeIcon(Icon, "comment-text-outline")}
                    />

                {/* Display */}
                <ItemDivider title="Display" />
                <ItemSwitch last
                    title="Hide Stranger"
                    { ...Storage.bind(this, "settingsVideo", "hideStranger") }
                    icon={makeIcon(Icon, "toggle-switch")}
                    />
                <ItemText
                    title="Face Keeping Time (Seconds)"
                    { ...Storage.bind(this, "settingsVideo", "faceKeepingTime", /^[0-9]+$/) }
                    icon={makeIcon(Icon, "timer")}
                    />

                {/* Legends */}
                <ItemDivider title="Legends" />
                <ItemColor
                    title="VIP"
                    color="#FF8C00AA"
                    colorTitle="Orange"
                    icon={<Button style={{ backgroundColor: "#FF8C00AA" }}><Icon style={styles.listitem_icon} active name="human-male" /></Button>}
                    />
                <ItemColor
                    title="Blacklist"
                    color="#B22222AA"
                    colorTitle="Red"
                    icon={<Button style={{ backgroundColor: "#B22222AA" }}><Icon style={styles.listitem_icon} active name="human-male" /></Button>}
                    />
                <ItemColor
                    title="Registered (No Group)"
                    color="#939798DD"
                    colorTitle="Gray"
                    icon={<Button style={{ backgroundColor: "#939798DD" }}><Icon style={styles.listitem_icon} active name="human-male" /></Button>}
                    />
                <ItemColor
                    title="Visitor"
                    color="#2E8B57AA"
                    colorTitle="Green"
                    icon={<Button style={{ backgroundColor: "#2E8B57AA" }}><Icon style={styles.listitem_icon} active name="human-male" /></Button>}
                    />
                <ItemColor last
                    title="Stranger"
                    color="#1D2073AA"
                    colorTitle="Dark Blue"
                    icon={<Button style={{ backgroundColor: "#1D2073AA" }}><Icon style={styles.listitem_icon} active name="human-male" /></Button>}
                    />

                {/* FRS Source */}
                {/* <ItemDivider title="FRS Source" />
                <ItemSwitch
                    title="Enable"
                    { ...Storage.bind(this, "settingsVideo", "fromFRS") }
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><Icon style={styles.listitem_icon} active name="toggle-switch" /></Button>}
                    />
                <ItemText
                    title="Channel"
                    { ...Storage.bind(this, "settingsVideo", "FRSCH", /^[0-9]+$/) }
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><IconOcticons style={[styles.listitem_icon, styles.listitem_icon_channel]} active name="device-camera-video" /></Button>}
                    /> */}

                {/* Camera Source */}
                {/* <ItemDivider title="Camera Source" />
                <ItemSwitch
                    title="Enable"
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><Icon style={styles.listitem_icon} active name="toggle-switch" /></Button>}
                    />
                <ItemText
                    title="IP Address"
                    { ...Storage.bind(this, "settingsVideo", "cameraIp") }
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><IconOcticons style={[styles.listitem_icon, styles.listitem_icon_channel]} active name="device-camera-video" /></Button>}
                    />
                <ItemText
                    title="Port"
                    { ...Storage.bind(this, "settingsVideo", "cameraPort") }
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><IconOcticons style={[styles.listitem_icon, styles.listitem_icon_channel]} active name="device-camera-video" /></Button>}
                    />
                <ItemText
                    title="Account"
                    { ...Storage.bind(this, "settingsVideo", "cameraAccount") }
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><IconOcticons style={[styles.listitem_icon, styles.listitem_icon_channel]} active name="device-camera-video" /></Button>}
                    />
                <ItemText
                    title="Password"
                    { ...Storage.bind(this, "settingsVideo", "cameraPassword") }
                    secureTextEntry={true}
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><IconOcticons style={[styles.listitem_icon, styles.listitem_icon_channel]} active name="device-camera-video" /></Button>}
                    />
                <ItemText
                    title="ChannelID"
                    { ...Storage.bind(this, "settingsVideo", "cameraChannelId") }
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><IconOcticons style={[styles.listitem_icon, styles.listitem_icon_channel]} active name="device-camera-video" /></Button>}
                    />
                <ItemText
                    title="URI"
                    { ...Storage.bind(this, "settingsVideo", "cameraUri") }
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><IconOcticons style={[styles.listitem_icon, styles.listitem_icon_channel]} active name="device-camera-video" /></Button>}
                    /> */}

            </Container>
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
});
