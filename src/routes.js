import React from 'react';
import { connect } from 'redux';
import { Route, Switch } from 'react-router-dom';

//components
import LoginFormContainer from './components/LoginFormContainer';
import SignUpFormContainer from './components/SignUpFormContainer';
import ProfilePage from './components/ProfilePage';

import { checkIsUserAuthenticated } from './actions/UserActions';

// class RouteHandler extends React.Component {

//     componentWillMount() {
//         !this.props.isUserAuthenticated && this.props.checkIsUserAuthenticated();
//     }
    
//     render(){
//         return(
//             <div className="mainContainer">
//                 <Switch>
//                     <Route exact path="(/?me)" render={ProfilePage} />
//                     <Route exact path="/signup" component={SignUpFormContainer} />
//                     <Route exact path="/login" component={LoginFormContainer} />
//                 </Switch>
//             </div>
//         );
//     }
// }

export default (
    <div className="mainContainer">
        <Switch>
            <Route exact path="/" component={ProfilePage} />
            <Route exact path="/me" component={ProfilePage} />
            <Route exact path="/signup" component={SignUpFormContainer} />
            <Route exact path="/login" component={LoginFormContainer} />
        </Switch>
    </div>
);

// export default withRouter(connect(state => ({
//     isUserAuthenticated: state.user.get('isAuthenticated')
// }), {
//         checkIsUserAuthenticated
//     })(RouteHandler));