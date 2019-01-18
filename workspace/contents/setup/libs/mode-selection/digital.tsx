import React, {Component, ReactElement} from 'react';
import {Platform, View, Image, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, Header, Title, Segment, Tabs, Tab, TabHeading, Content, ListItem, Switch, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input, H1, Label } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { rcImages } from './../../../../resources/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import { ItemDivider, ItemSwitch, ItemText } from './../../../../../core/components/form';
import { StorageInstance as Storage, SettingsDigital, makeIcon } from './../../../../config';
import lang, { _ } from './../../../../../core/lang';
import { ConnectObservables } from './../../../../../helpers/storage/connect';

interface Props {
    settingsDigital?: SettingsDigital;
}

interface State {

}

@ConnectObservables({
    settingsDigital: Storage.getObservable("settingsDigital"),
    lang: lang.getLangObservable()
})
export class Digital extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    private subject = Storage.getSubject("settingsDigital");
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
                {/* General */}
                <ItemDivider title={_("w_General")} />
                <ItemText
                    title={_("w_CompanyName")}
                    { ...Storage.vbind(this, "settingsDigital", "companyName") }
                    icon={makeIcon(Icon, "access-point")}
                    />

                {/* Location */}
                <ItemDivider title={_("w_MyLocation")} />
                <ItemText
                    title="Latitude"
                    { ...Storage.bind(this, "settingsDigital", "latitude") }
                    icon={makeIcon(Icon, "access-point")}
                    />
                <ItemText
                    title="Longitude"
                    { ...Storage.bind(this, "settingsDigital", "longitude") }
                    icon={makeIcon(Icon, "access-point")}
                    />

                {/* Location */}
                <ItemDivider title={_("w_GreetingMessage")} />
                <ItemText
                    title={_("w_Morning")}
                    { ...Storage.bind(this, "settingsDigital", "greetingMorning") }
                    icon={makeIcon(Icon, "message-text")}
                    />
                <ItemText
                    title={_("w_Afternoon")}
                    { ...Storage.bind(this, "settingsDigital", "greetingAfternoon") }
                    icon={makeIcon(Icon, "message-text")}
                    />
                <ItemText
                    title={_("w_Evening")}
                    { ...Storage.bind(this, "settingsDigital", "greetingEvening") }
                    icon={makeIcon(Icon, "message-text")}
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