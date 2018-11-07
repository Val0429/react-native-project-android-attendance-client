import React, {Component, ReactElement} from 'react';
import {Platform, View, Image, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, Header, Title, Segment, Tabs, Tab, TabHeading, Content, ListItem, Switch, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input, H1, Label } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { rcImages } from './../../../resources/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import { ItemDivider, ItemSwitch, ItemText } from './../../../../core/components/form';
import Storage, { SettingsFRS } from './../../../config/storage';

interface Props {
    style?: ViewStyle;
}

type States = SettingsFRS;

export class FRS extends Component<Props, States> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    private subject = Storage.getSubject("settingsFRS");
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
            <Container style={this.props.style}>
                <Header>
                    <Body style={{alignItems: 'center'}}><Title>FRS</Title></Body>
                </Header>

                {/* General */}
                <ItemDivider title="General" />
                <ItemText
                    title="IP"
                    { ...Storage.bind(this, "settingsFRS", "ip") }
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><IconOcticons style={[styles.listitem_icon, styles.listitem_icon_channel]} active name="device-camera-video" /></Button>}
                    />

                <ItemText
                    title="Account"
                    { ...Storage.bind(this, "settingsFRS", "account") }
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><IconOcticons style={[styles.listitem_icon, styles.listitem_icon_channel]} active name="device-camera-video" /></Button>}
                    />

                <ItemText
                    title="Password"
                    secureTextEntry={true}
                    { ...Storage.bind(this, "settingsFRS", "password") }
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><IconOcticons style={[styles.listitem_icon, styles.listitem_icon_channel]} active name="device-camera-video" /></Button>}
                    />

                <ItemText
                    title="API Port"
                    { ...Storage.bind(this, "settingsFRS", "apiPort") }
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><IconOcticons style={[styles.listitem_icon, styles.listitem_icon_channel]} active name="device-camera-video" /></Button>}
                    />

                <ItemText
                    title="Socket Port"
                    { ...Storage.bind(this, "settingsFRS", "socketPort") }
                    icon={<Button style={{ backgroundColor: "#BC913F" }}><IconOcticons style={[styles.listitem_icon, styles.listitem_icon_channel]} active name="device-camera-video" /></Button>}
                    />

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