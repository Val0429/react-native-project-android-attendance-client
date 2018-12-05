import React, {Component, ReactElement} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { Button } from 'native-base';

EStyleSheet.build({
    $rem:
        Math.min(
            Dimensions.get('window').width / 380,
            Dimensions.get('window').height / 220
        ),
    $bgColor: "#191F2C"
});


export const defaultStyles = EStyleSheet.create({
    icon_button: {
        backgroundColor: "#193966",
    },
    icon_style: {
        color: "white",
        fontSize: 16
    }
});

export function makeIcon(IconClass, name: string) {
    return <Button style={defaultStyles.icon_button}><IconClass style={defaultStyles.icon_style} active name={name} /></Button>;
}
