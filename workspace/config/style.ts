import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

EStyleSheet.build({
    $rem:
        Math.min(
            Dimensions.get('window').width / 380,
            Dimensions.get('window').height / 220
        ),
    $bgColor: "#191F2C"
});