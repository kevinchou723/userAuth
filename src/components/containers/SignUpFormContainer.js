import React from 'react';
import { connect } from 'react-redux';
import {
    checkUserAuthentication,
    signUpUser
} from '../../actions/UserActions';
import {
    hasErrors,
    allFieldsCompleted
} from '../../utils/validation';
import SignUpForm from '../modules/SignUpForm';

class SignUpFormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.signUpUser();
    }

    componentDidMount() {
        this.props.checkUserAuthentication && this.props.checkUserAuthentication();
    }

    render() {
        //if all fields are completed without errors
        const fieldsCompleted = this.props.signUpForm && allFieldsCompleted(this.props.signUpForm, hasErrors(this.props.signUpForm));
        //enabled submitbutton
        const isSubmitDisabled = this.props.signUpForm && !fieldsCompleted;
        return !this.props.isAuthenticated ? (
            <div className="mainWrapper">
                <div className="formContainer" id="signupFormContainer">
                    <h1 className="formTitle">Sign Up</h1>
                    <SignUpForm
                        isSubmitDisabled={isSubmitDisabled} 
                        handleSubmit={this.handleSubmit}
                        flashMessage={this.props.flashMessage}
                    />
                </div>
            </div>
        ) : null;
    }
}
export default connect(state => ({
    signUpForm: state.form.signup,
    isAuthenticated: state.user.get('isAuthenticated'),
    flashMessage: state.user.get('flashMessage')
}), {
        signUpUser
    })(SignUpFormContainer);