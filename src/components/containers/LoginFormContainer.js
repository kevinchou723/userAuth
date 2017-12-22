import React from 'react';
import { connect } from 'react-redux';
import {
    checkUserAuthentication,
    loginUser
} from '../../actions/UserActions';
import {
    hasErrors,
    allFieldsCompleted
} from '../../utils/validation';
import LoginForm from '../modules/LoginForm';

class LoginFormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.loginUser();
    }

    componentDidMount() {
        this.props.checkUserAuthentication && this.props.checkUserAuthentication();
    }

    render() {
        //if all fields are completed without errors
        const fieldsCompleted = this.props.loginForm && allFieldsCompleted(this.props.loginForm, hasErrors(this.props.loginForm));
        //enabled submitbutton
        const isSubmitDisabled = this.props.loginForm && !fieldsCompleted;

        return !this.props.isAuthenticated ? (
            <div className="mainWrapper">
                <div className="formContainer" id="loginFormContainer">
                    <h1 className="formTitle">Log In</h1>
                    <LoginForm 
                        handleSubmit={this.handleSubmit}
                        isSubmitDisabled={isSubmitDisabled}
                        flashMessage={this.props.flashMessage}
                    />
                </div>
            </div>
        ) : null;
    }
}
export default connect(state => ({
    loginForm: state.form.login,
    isAuthenticated: state.user.get('isAuthenticated'),
    flashMessage: state.user.get('flashMessage')
}), {
        loginUser
    })(LoginFormContainer);