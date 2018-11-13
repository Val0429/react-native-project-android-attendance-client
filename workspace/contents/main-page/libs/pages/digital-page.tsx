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

import Shimmer from 'react-native-shimmer';

interface Props {

}

export class DigitalPage extends Component<Props> {
    render() {
        return (
            <Container>
                <Content bounces={false} contentContainerStyle={{flex: 1}} style={[styles.content]}>
                    {/* background image */}
                    <Image source={rcImages.digital_bk} resizeMode="stretch" style={{flex: 1, width: '100%'}} />

                    <Text style={styles.welcome}>Good Morning!{"\r\n"}美好的一天開始！</Text>

                    <Text style={styles.incoming}>Jack</Text>

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
        top: "32%",
        left: "4%",
        color: "#9ACE32",
        fontSize: "32 rem"
    },

    incoming: {
        position: "absolute",
        bottom: "15%",
        left: "4%",
        color: "black",
        fontSize: "32 rem",
        fontWeight: "bold"
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
  