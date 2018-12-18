import React, {Component} from 'react';
import {Platform, StatusBar, View, Image, NativeModules, requireNativeComponent} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input, Label, Picker } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { rcImages } from './../../resources/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ConnectObservables } from './../../../helpers/storage/connect';
import lang, { _ } from './../../../core/lang';
import FaceFeatureCompare from 'react-native-feature-compare';
let RNFS = require('react-native-fs');

let package = require('./../../../package.json');

interface Props {
    lang: string;
}

@ConnectObservables({
    lang: lang.getLangObservable()
})
export class LoginContent extends Component<Props> {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        do {
            let path = `${RNFS.ExternalCachesDirectoryPath}/crash_notify`;
            let result = await RNFS.exists(path);
            if (result) { await RNFS.unlink(path); break; }

            path = `${RNFS.CachesDirectoryPath}/crash_notify`;
            result = await RNFS.exists(path);
            if (result) { await RNFS.unlink(path); break; }

            return;

        } while(0);

        Actions.push('main');
    }

    render() {

        return (
            <Container>
                <StatusBar hidden />
                <Content bounces={false} contentContainerStyle={{flex: 1}} style={styles.content}>
                    <Grid>
                        {/* image */}
                        <Row size={4} style={[styles.row_base, styles.row_1_icon]}>
                            <Image style={{height: "80%"}} resizeMode="contain" source={rcImages.attendance} />
                        </Row>
                        {/* title */}
                        <Row size={0.7} style={[styles.row_base, styles.row_2_title]}>
                            <Text style={styles.title}>Attendance Client</Text>
                            <Text style={styles.version}>{`v${package.version}`}</Text>
                        </Row>
                        {/* form */}
                        <Row size={2.5} style={[styles.row_base, styles.row_3_form]}>
                            <Col size={1.5} />
                            <Col size={1}>
                                {/* <Item style={styles.item}>
                                    <Icon name='security-account' style={styles.item_icon} />
                                    <Input style={styles.item_input} placeholder='Account'/>
                                </Item>

                                <Item last style={styles.item}>
                                    <Icon name='security' style={styles.item_icon} />
                                    <Input secureTextEntry={true} style={styles.item_input} placeholder='Password'/>
                                </Item> */}

                                <View style={{width: 200, height: 40, backgroundColor: 'white', borderRadius: 4, alignSelf: 'center', justifyContent: 'center'}}>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{width: 200, height: 40, color: 'black'}}
                                        selectedValue={this.props.lang}
                                        onValueChange={(value) => lang.setLang(value)}
                                        >
                                        { 
                                            (() => {
                                                let list = lang.list();
                                                return Object.keys(list).map( (key) => {
                                                    return <Picker.Item key={key} label={list[key]} value={key} />
                                                })
                                            })()
                                        }
                                    </Picker>
                                </View>

                                {/* <Button style={styles.item_button} primary full onPress={() => FaceFeatureCompare.TestCrash()}> */}
                                <Button style={styles.item_button} primary full onPress={() => Actions.push('main')}>
                                    <Icon name='login' style={[styles.item_icon, {fontSize: 32, marginTop: 1}]} />
                                    <Text style={styles.item_input}>{_("w_Start")}</Text>
                                </Button>
                            </Col>
                            <Col size={1.5} />

                        </Row>
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

    row_base: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    row_1_icon: {
        alignItems: 'flex-end',
        paddingBottom: '10rem'
    },

    row_2_title: {
        alignItems: 'flex-start'
    },
    title: {
        fontFamily: 'FontAwesome',
        fontSize: "18 rem",
        color: 'white'
    },
    version: {
        marginLeft: '5rem',
        color: 'white'
    },

    row_3_form: {
        alignItems: 'flex-start'
    },
    item: {
        margin: "1 rem"
    },
    item_icon: {
        color: "#EEEEFF",
        fontSize: "12 rem"
    },
    item_input: {
        color: "white",
        marginLeft: "4 rem",
        fontSize: "8 rem"
    },
    item_button: {
        marginTop: "7 rem",
        borderRadius: "2 rem",
        height: "18 rem",
    }
  });
  