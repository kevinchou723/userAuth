import React from 'react';
import { connect } from 'redux';
import { Route, Switch } from 'react-router-dom';

//components
import LoginFormContainer from './LoginFormContainer';
import SignUpFormContainer from './SignUpFormContainer';
import ProfilePage from './ProfilePage';

import { checkIsUserAuthenticated } from '../../actions/UserActions';
import '../../styles/main.scss';

const App = () => (
    <div className="mainContainer">
        <Switch>
            <Route exact path="/" component={ProfilePage} />
            <Route exact path="/me" component={ProfilePage} />
            <Route exact path="/signup" component={SignUpFormContainer} />
            <Route exact path="/login" component={LoginFormContainer} />
        </Switch>
    </div>
);

export default App;