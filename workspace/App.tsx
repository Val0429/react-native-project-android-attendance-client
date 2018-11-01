import React, {Component} from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import { LoginContent } from './contents/login';
import { VideoPage } from './contents/video-page';


import { Container } from 'native-base';
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Container>
        <LoginContent />
      </Container>
    );
  }
}

// const App = () => (
//     <Router>
//         <Stack key="root" hideNavBar={true}>
//             <Scene key="login" component={LoginContent} />
//             <Scene key="videopage" component={VideoPage} />
//         </Stack>
//     </Router>
// );
// export default App;
