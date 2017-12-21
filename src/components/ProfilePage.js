import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { checkIsUserAuthenticated } from '../actions/UserActions';

class ProfilePage extends React.Component {

    componentWillMount (){
        // !this.props.isAuthenticated && this.props.checkIsUserAuthenticated();
        this.props.checkIsUserAuthenticated();
    }

    render() {
        const { firstname, email, isAuthenticated } = this.props;
        return (
            <div className="mainWrapper">
                <img className="profileImage" src="" />
                <div className="welcomeMessage">Welcome {firstname}</div>
                <div className="emailMessage">Your email is {email}</div>
                
            </div>
        );
    }
}
export default connect(state => ({
    isAuthenticated: state.user.get('isAuthenticated'),
    firstname: state.user.get('firstname'),
    email: state.user.get('email')
}), {
        checkIsUserAuthenticated
})(ProfilePage);
// { !isAuthenticated && <Redirect to="/login" /> }