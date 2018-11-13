import React, {Component, ReactElement} from 'react';
import {Platform, View, Image, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { rcImages } from '../../../../resources/images';
import { rcMovies } from '../../../../resources/movies';
import Iconion from 'react-native-vector-icons/Ionicons';
import frs, {RecognizedUser, UnRecognizedUser, UserType, Gender} from './../../../../services/frs-service';
import { Subscription } from 'rxjs';
import Video from 'react-native-video';

import { FaceDetectionView } from 'react-native-face-detection';

interface Props {

}

interface States {
    background?: any;
    video?: any;
    age?: number;
}

const childAge: number = 30;

export class AttendanceTakingPage extends Component<Props, States> {
    constructor(props) {
        super(props);
        this.state = {
            //video: rcMovies.video_woman
        }
    }

    private subscription: Subscription;
    componentDidMount() {
        this.subscription = frs.livestream.subscribe( (data) => {
            //this.handleFace(data);
        });
    }
    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    private async handleFace(data: RecognizedUser | UnRecognizedUser | string) {
        let base64: string;
        if (typeof data === 'string') {
            base64 = data;
        }
        else if (data.type === UserType.Recognized) {
            let user = data as RecognizedUser;
            // let base64 = await frs.snapshot(user.snapshot);
            // let result = await frs.demographic(base64);
            // console.log('result', result)
            base64 = await frs.snapshot(data.snapshot);

        } else {
            let user = data as UnRecognizedUser;
            // let base64 = await frs.snapshot(user.snapshot);
            // let result = await frs.demographic(base64);
            // console.log('result', result)
            base64 = await frs.snapshot(data.snapshot);
        }
        let result = await frs.demographic(base64);
        console.log('result', result)
        if (result.age >= 50) {
            // this.setState({background: rcImages.demo_old, age: result.age});
            this.state.video !== rcMovies.video_oldman && this.setState({video: rcMovies.video_oldman});
        } else if (result.age < 50 && result.age >= childAge) {
            // result.gender === Gender.male && this.setState({background: rcImages.demo_man, age: result.age});
            // result.gender === Gender.female && this.setState({background: rcImages.demo_woman, age: result.age});
            
            result.gender === Gender.male && this.state.video !== rcMovies.video_man && this.setState({video: rcMovies.video_man});
            result.gender === Gender.female && this.state.video !== rcMovies.video_woman && this.setState({video: rcMovies.video_woman});
        } else if (result.age < childAge) {
            // this.setState({background: rcImages.demo_child, age: result.age});
            //this.setState({video: rcMovies.video_child});
            this.state.video !== rcMovies.video_child && this.setState({video: rcMovies.video_child});
        }
    }

    render() {
        return (
            <Container>
                <Content bounces={false} contentContainerStyle={{flex: 1}} style={[styles.content]}>
                    <FaceDetectionView key="FaceDetectionView" style={{width: 1, height: 1, position: "absolute"}} ref={(ref) => ref && ref.start(true)}
                        onNativeCallback={(event) => {
                            this.handleFace(event.nativeEvent.image);
                        }}
                    />

                    { !this.state.video && <Image source={this.state.background || rcImages.digital_bk} resizeMode="stretch" style={{flex: 1, width: '100%'}} /> }

                    { !this.state.video && <Text style={styles.welcome}>Attendance Taking...</Text> }

                    {/* <Video source={{uri: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'}} style={{flex: 1, width: '100%'}} /> */}
                    { this.state.video && <Video source={this.state.video} style={{flex: 1, width: '100%'}} onEnd={() => this.setState({video: undefined})} /> }

                    {/* Setup */}
                    <TouchableOpacity style={styles.setup_icon_touchable} activeOpacity={0.7} onPress={() => Actions.push('setup')}>
                        <Iconion name='md-cog' style={styles.setup_icon} />
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}  

                    // {/* background image */}
                    // <Image source={this.state.background || rcImages.digital_bk} resizeMode="stretch" style={{flex: 1, width: '100%'}} />

                    // { !this.state.background && <Text style={styles.welcome}>Attendance Taking...</Text> }
                    // <Text style={styles.age}>{this.state.age}</Text>

                    // {/* Setup */}
                    // <TouchableOpacity style={styles.setup_icon_touchable} activeOpacity={0.7} onPress={() => Actions.push('setup')}>
                    //     <Iconion name='md-cog' style={styles.setup_icon} />
                    // </TouchableOpacity>

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

    age: {
        position: "absolute",
        bottom: "25%",
        left: "8%",
        color: "#111133",
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
    },

    video_hidden: {
        width: 0, height: 0
    },
    video_show: {
        flex: 1,
        width: '100%'
    }

});
  