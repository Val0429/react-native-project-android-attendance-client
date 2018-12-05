import React, {Component} from 'react';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
import './resources/lang';
import { StorageInstance as Storage } from './config';

import { LoginContent } from './contents/login';
import { MainPage } from './contents/main-page';
import { Setup } from './contents/setup';

import { WorkflowPage } from './contents/main-page/libs/pages/attendance-taking-page/workflow-page';
import { Workflow1Page } from './contents/main-page/libs/pages/attendance-taking-page/workflow-1-page';

class App extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { ready: false }
    }
    componentWillMount() {
        Storage.ready.subscribe( (ready) => this.setState({ready}) );
    }
    render() {
        return this.state.ready ? (
            <Router>
                <Stack key="root" hideNavBar={true}>
                    
                    <Scene key="login" component={LoginContent} />
                    <Scene key="main" component={MainPage} />
                    <Scene key="setup" component={Setup} />

                    <Scene key="workflow" component={WorkflowPage} />
                    <Scene key="workflow1" component={Workflow1Page} />
                </Stack>
            </Router>
        ) : null;
    }
}
export default App;
