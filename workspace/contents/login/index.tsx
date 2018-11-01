import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { rcImages } from './../../resources/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {

}

export class LoginContent extends Component<Props> {
    render() {
        return (
            <Container>
                <Content bounces={false} contentContainerStyle={{flex: 1}} style={{backgroundColor: "#191F2C"}}>
                    <Grid>
                        {/* image */}
                        <Row size={3} style={[styles.row,
                            {alignItems: 'flex-end', paddingBottom: 20}]}>
                            <Image source={rcImages.attendance} />
                        </Row>
                        {/* title */}
                        <Row size={0.7} style={[styles.row,
                            {alignItems: 'flex-start'}]}>
                            <Text style={styles.title}>Attendance Client</Text>
                        </Row>
                        {/* form */}
                        <Row size={4} style={[styles.row,
                            {alignItems: 'flex-start'}]}>

                            <Col size={1.5} />
                            <Col size={1}>
                                <Item style={styles.item}>
                                    <Icon name='security-account' style={styles.item_icon} />
                                    <Input style={styles.item_input} placeholder='Account'/>
                                </Item>

                                <Item last style={styles.item}>
                                    <Icon name='security' style={styles.item_icon} />
                                    <Input secureTextEntry={true} style={styles.item_input} placeholder='Password'/>
                                </Item>

                                <Button style={styles.item_button} primary full onPress={() => Actions.push('videopage')}>
                                    <Icon name='login' style={[styles.item_icon, {fontSize: 32, marginTop: 4}]} />
                                    <Text style={styles.item_input}>Login</Text>
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
  