import React from 'react';
import { connect } from 'react-redux';
import {
    checkUserAuthentication
} from '../actions/UserActions';
import {
    hasErrors,
    allFieldsCompleted
} from '../utils/validation';
import LoginForm from './LoginForm';

class LoginFormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        e.preventDefault();
        console.log('login click');
    }

    componentWillMount() {
        // if(this.props.sessionId){
        //     this.props.checkUserAuthentication({ sessionId: this.props.sessionId});
        // }
    }

    render() {
        const fieldsCompleted = this.props.loginForm && allFieldsCompleted(this.props.loginForm);
        const isSubmitDisabled = this.props.loginForm && hasErrors(this.props.loginForm) && !fieldsCompleted;
        return (
            <div className="formContainer">
                <LoginForm 
                    handleSubmit={this.handleSubmit}
                    isSubmitDisabled={isSubmitDisabled} 
                />
            </div>
        );
    }
}
export default connect(state => ({
    loginForm: state.form.login
    // sessionId: state.user.get('sessionId'),
    // isAuthenticated: state.user.get('isAuthenticated')
}), {

    })(LoginFormContainer);