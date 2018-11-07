import React, {Component, ReactElement} from 'react';
import {Platform, View, Image, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { rcImages } from './../../resources/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { OutlineElement } from './libs/outline-element';
import { Face } from './libs/face';

import Shimmer from 'react-native-shimmer';

interface Props {

}

export class VideoPage extends Component<Props> {
    render() {
        return (
            <Container>
                <Content bounces={false} contentContainerStyle={{flex: 1}} style={styles.content}>
                    {/* background image */}
                    <Image source={rcImages.rtsp_test} resizeMode="cover" style={{flex: 1, width: '100%'}} />

                    {/* company name */}
                    <Shimmer style={styles.company_title_position} duration={2600}>
                        <H1 style={styles.company_title}>旭人科技股份有限公司</H1>
                    </Shimmer>

                    {/* time */}
                    <OutlineElement style={styles.time_position} width={3} shadowRadius={5}>
                        <H1 style={styles.time}>12:05:33</H1>
                    </OutlineElement>

                    {/* date */}
                    <OutlineElement style={styles.date_position} width={3} shadowRadius={5}>
                        <H1 style={styles.date}>2018年10月01日</H1>
                    </OutlineElement>

                    {/* face area */}
                    <View style={styles.face_area}>
                        <Face style={[styles.face_area_faces]} />
                        <Face style={styles.face_area_faces} />
                        <Face style={styles.face_area_faces} />
                        <Face style={styles.face_area_faces} />
                        <Face style={styles.face_area_faces} />
                    </View>

                    {/* Setup */}
                    <TouchableOpacity style={styles.setup_icon_touchable} activeOpacity={0.7} onPress={() => Actions.push('setup')}>
                        <Icon name='cogs' style={styles.setup_icon} />
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

    company_title_position: {
        position: "absolute",
        left: "6 rem", top: "6.5 rem"
    },

    company_title: {
        $fontSize: "20 rem",
        backgroundColor: '#26262688',
        color: "white",
        fontSize: "$fontSize",
        lineHeight: "$fontSize * 1.3",
        paddingLeft: "4 rem",
        paddingRight: "4 rem",
        borderRadius: "3 rem"
    },

    time_position: {
        position: "absolute",
        right: "4 rem",
        top: "3 rem",
    },
    time: {
        $fontSize: "22 rem",
        backgroundColor: "transparent",
        color: "black",
        fontFamily: 'monospace',
        fontSize: "$fontSize",
        lineHeight: "$fontSize * 1.1",
        textShadowColor: 'rgba(255, 255, 255, 0.75)',
    },

    date_position: {
        position: "absolute",
        right: "7 rem",
        top: "30 rem",
    },
    date: {
        $fontSize: "11 rem",
        backgroundColor: "transparent",
        color: "black",
        fontSize: "$fontSize",
        lineHeight: "$fontSize * 1.1",
        textShadowColor: 'rgba(255, 255, 255, 0.75)',
    },

    face_area: {
        position: 'absolute',
        left: '5 rem', bottom: '3 rem',
        height: '80 rem', width: '100%-10rem',
        flexDirection: 'row',
        alignItems: 'flex-end',
        // backgroundColor: 'red'
    },
    face_area_faces: {
        marginLeft: '1.5 rem', marginRight: '1.5 rem'
    },

    setup_icon_touchable: {
        position: "absolute",
        right: "5 rem",
        bottom: "5 rem"
    },
    setup_icon: {
        fontSize: "24 rem",
        color: "#AAAABB",
    }

});
  