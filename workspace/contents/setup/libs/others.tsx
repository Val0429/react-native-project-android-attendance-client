import React, {Component, ReactElement} from 'react';
import {Platform, View, Image, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, Header, Title, Segment, Tabs, Tab, TabHeading, Content, ListItem, Switch, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input, H1, Label } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { rcImages } from './../../../resources/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { ItemDivider, ItemSwitch, ItemText, ItemPicker } from './../../../../core/components/form';
import { StorageInstance as Storage, SettingsFRS, makeIcon, SettingsOthers } from './../../../config';
import { ConnectObservables } from './../../../../helpers/storage/connect';
import lang, { _ } from './../../../../core/lang';

interface Props {
    style?: ViewStyle;
    settingsOthers?: SettingsOthers;
}

interface State {

}

@ConnectObservables({
    settingsOthers: Storage.getObservable("settingsOthers"),
    lang: lang.getLangObservable()
})
export class Others extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container style={this.props.style}>
                <Header>
                    <Body style={{alignItems: 'center'}}><Title>{_("w_Others")}</Title></Body>
                </Header>

                {/* General */}
                <ItemDivider title={_("w_General")} />

                <ItemSwitch
                    title={_("m_AutoLogin")}
                    { ...Storage.vbind(this, "settingsOthers", "autoLogin") }
                    icon={makeIcon(Icon, "toggle-switch")}
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