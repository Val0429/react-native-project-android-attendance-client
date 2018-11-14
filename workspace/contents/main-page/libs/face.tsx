import React, {Component, ReactElement} from 'react';
import {Platform, Image, StyleProp, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Container, Thumbnail, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import frs, {RecognizedUser, UnRecognizedUser, UserType, Gender} from './../../../services/frs-service';

import { rcImages } from './../../../resources/images';

interface Props {
    user: RecognizedUser | UnRecognizedUser;
    style?: StyleProp<ViewStyle>;
}

export class Face extends Component<Props> {
    getFace() {
        return this.props.user.type === UserType.Recognized ? this.getRecognizedFace() : this.getUnRecognizedFace();
    }
    getRecognizedFace() {
        let user = this.props.user as RecognizedUser;
        let date = new Date(user.timestamp);
        let datestring = `${pad(date.getHours()-date.getTimezoneOffset()/8, 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}`;
        return (
            <>
                <Row style={[styles.row_main]} size={3.2}>
                    <Image style={styles.row_image_1} resizeMode="contain" source={{ uri: frs.snapshotUrl(this.props.user.snapshot) }} />
                </Row>
                <Row style={[styles.row_main]} size={1}>
                    <Text style={[styles.row_text, styles.row_text_1_id]}>{user.person_info.employeeno}</Text>
                </Row>
                <Row style={[styles.row_main, styles.row_main_2]} size={0.8}>
                    <Text style={[styles.row_text, styles.row_text_2_title]} numberOfLines={1}>{user.person_info.fullname}</Text>
                </Row>
                <Row style={[styles.row_main, styles.row_main_3]} size={1}>
                    <Text style={styles.row_text}>{datestring}</Text>
                </Row>
            </>
        );
    }
    getUnRecognizedFace() {
        let user = this.props.user as RecognizedUser;
        let date = new Date(user.timestamp);
        let datestring = `${date.getHours()}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}`;
        return (
            <>
                <Row style={[styles.row_main]} size={3.2}>
                    <Image style={styles.row_image_1} resizeMode="contain" source={{ uri: frs.snapshotUrl(this.props.user.snapshot) }} />
                </Row>
                <Row style={[styles.row_main]} size={1}>
                    <Text style={[styles.row_text, styles.row_text_1_id]}></Text>
                </Row>
                <Row style={[styles.row_main, styles.row_main_2]} size={0.8}>
                    <Text style={[styles.row_text, styles.row_text_2_title]} numberOfLines={1}>No Match</Text>
                </Row>
                <Row style={[styles.row_main, styles.row_main_3]} size={1}>
                    <Text style={styles.row_text}>{datestring}</Text>
                </Row>
            </>
        );
    }

    render() {
        let user = this.props.user as RecognizedUser;
        let group = (user.groups || []).reduce( (final, group) => {
            if (final) return final;
            return group.name;
        }, undefined);

        let baseStyle = [styles.main];
        if (group) {
            if (group === 'Guard' || group === 'VIP') baseStyle.push(styles.role_vip);
            else if (group === 'Blacklist') baseStyle.push(styles.role_blacklist);
        }

        return (
            <View padder={true} style={[...baseStyle, this.props.style]}>
                { this.getFace() }
            </View>
        );
    }
}  

const styles = EStyleSheet.create({
    main: {
        // width: "48 rem",
        // height: "62 rem",
        width: "41 rem",
        height: "53 rem",
        backgroundColor: '#262626AA',
        color: "white",
        borderRadius: 8
    },

    role_vip: {
        backgroundColor: '#FF8C00AA'
    },
    role_blacklist: {
        backgroundColor: '#B22222AA'
    },

    row_main: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    row_main_2: {
        marginLeft: 6,
        marginRight: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE' 
    },
    row_main_3: {
        alignItems: 'flex-end'
    },

    row_image_1: {
        height:'100%', width: '85%', borderColor: '#DDDDDD', borderWidth: 1
    },

    row_text: {
        color: 'white',
        fontSize: '5.6 rem'
    },
    row_text_1_id: {
        fontSize: '6 rem',
        fontWeight: 'bold'
    },
    row_text_2_title: {
        fontSize: '6.2 rem'
    }

    // content: {
    //     backgroundColor: "$bgColor"
    // },

    // company_title_position: {
    //     position: "absolute",
    //     left: "6 rem", top: "6.5 rem"
    // },

    // company_title: {
    //     $fontSize: "20 rem",
    //     backgroundColor: '#26262688',
    //     color: "white",
    //     fontSize: "$fontSize",
    //     lineHeight: "$fontSize * 1.3",
    //     paddingLeft: "4 rem",
    //     paddingRight: "4 rem",
    //     borderRadius: "3 rem"
    // },

    // time_position: {
    //     position: "absolute",
    //     right: "4 rem",
    //     top: "3 rem",
    // },
    // time: {
    //     $fontSize: "24 rem",
    //     backgroundColor: "transparent",
    //     color: "black",
    //     fontSize: "$fontSize",
    //     lineHeight: "$fontSize * 1.1",
    //     textShadowColor: 'rgba(255, 255, 255, 0.75)',
    // },

    // date_position: {
    //     position: "absolute",
    //     right: "7 rem",
    //     top: "31 rem",
    // },
    // date: {
    //     $fontSize: "11 rem",
    //     backgroundColor: "transparent",
    //     color: "black",
    //     fontSize: "$fontSize",
    //     lineHeight: "$fontSize * 1.1",
    //     textShadowColor: 'rgba(255, 255, 255, 0.75)',
    // }

});

function pad(n, width, z?) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}