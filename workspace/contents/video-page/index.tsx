import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { rcImages } from './../../resources/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {

}

export class VideoPage extends Component<Props> {
    render() {
        return (
            <Container>
                <Content bounces={false} contentContainerStyle={{flex: 1}} style={{backgroundColor: "#191F2C"}}>
                    
                </Content>
            </Container>
        );
    }
}  

const styles = StyleSheet.create({
    row: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
        fontFamily: 'FontAwesome',
        fontSize: 48,
        color: 'white'
    },
    item: {
        margin: 5
    },
    item_icon: {
        color: "#EEEEFF",
        fontSize: 36
    },
    item_input: {
        color: "white",
        marginLeft: 10,
        fontSize: 24
    },
    item_button: {
        marginTop: 15,
        borderRadius: 5,
        height: 50,
    }
  });
  