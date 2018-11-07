import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

EStyleSheet.build({
    $rem: Dimensions.get('window').width / 380,
    $bgColor: "#191F2C"
});