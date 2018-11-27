import React, {Component, ReactElement} from 'react';
import {Platform, View, Image, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, Header, Title, Content, ListItem, Switch, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { rcImages } from './../../resources/images';
import { ModeSelection } from './libs/mode-selection';
import { ItemDivider, ItemNavigate } from './../../../core/components/form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import { StorageInstance as Storage, modesText, SettingsModes } from './../../config';
import { FRS } from './libs/frs';
import { DGS } from './libs/dgs';
import { Basic } from './libs/basic';

interface Props {

}

interface Selection {
    selection: "mode" | "basic" | "frs" | "dgs";
}

type States = SettingsModes & Selection;

export class Setup extends Component<Props, States> {
    constructor(props) {
        super(props);
        this.state = {
            selection: "mode"
        };
    }

    private subject = Storage.getSubject("modes");
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
                <Content style={styles.full_height} bounces={false}>
                    <Grid style={styles.full_height}>
                        <Col style={styles.col_left}>
                            <Header>
                                <Left>
                                    <Button transparent onPress={() => Actions.pop()}>
                                        <Icon2 style={styles.left_header_icon} name='ios-arrow-back' />
                                    </Button>
                                </Left>
                                <Body>
                                    <Title>Settings</Title>
                                </Body>
                            </Header>

                            {/* ListItem - Modes */}
                            <ItemDivider title="Basic" />
                            <ItemNavigate title="Mode Selection" onPress={() => this.setState({selection: "mode"})}
                                value={modesText[this.state.modes]}
                                icon={<Button style={{ backgroundColor: "#3CB371" }}><Icon style={styles.left_listitem_icon} active name="toggle-switch" /></Button>}
                                />
                            <ItemNavigate title="Display" last onPress={() => this.setState({selection: "basic"}) }
                                icon={<Button style={{ backgroundColor: "#EE82EE" }}><Icon3 style={styles.left_listitem_icon} active name="screen-desktop" /></Button>}
                                />

                            {/* Servers */}
                            <ItemDivider title="Servers" />
                            <ItemNavigate title="FRS" last onPress={() => this.setState({selection: "frs"}) }
                                icon={<Button style={{ backgroundColor: "#A0A0ED" }}><Icon style={styles.left_listitem_icon} active name="face" /></Button>}
                                />
                            <ItemNavigate title="Demographic" last onPress={() => this.setState({selection: "dgs"}) }
                                icon={<Button style={{ backgroundColor: "#A0A0ED" }}><Icon style={styles.left_listitem_icon} active name="face" /></Button>}
                                />

                        </Col>

                        <Col size={1}>
                            { this.state.selection === "mode" && <ModeSelection style={styles.full_height} /> }
                            { this.state.selection === "basic" && <Basic style={styles.full_height} /> }
                            { this.state.selection === "frs" && <FRS style={styles.full_height} /> }
                            { this.state.selection === "dgs" && <DGS style={styles.full_height} /> }
                        </Col>
                    </Grid>
                </Content>
            </Container>
        );
    }
}  

const styles = EStyleSheet.create({
    content: {
        backgroundColor: "$bgColor"
    },

    full_height: {
        height: "100%-0",
    },

    col_left: {
        width: "130 rem",
        borderColor: "#888",
        borderRightWidth: 0.5
    },
    left_header_icon: {
        color: "white",
        fontSize: "10 rem"
    },
    left_listitem_icon: {
        color: "white",
        fontSize: "7 rem"
    },
    left_listitem_icon_light: {
        color: "#666",
        fontSize: "7 rem"
    },
    right_listitem_icon: {
        fontSize: "6 rem",
        marginLeft: "3 rem"
    }
});
  