import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
    checkUserAuthentication,
    signUpUser
} from '../actions/UserActions';
import {
    hasErrors,
    allFieldsCompleted
} from '../utils/validation';
import SignUpForm from './SignUpForm';

class SignUpFormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.signUpUser();
    }

    componentWillMount() {
        // if(this.props.sessionId){
        //     this.props.checkUserAuthentication({ sessionId: this.props.sessionId});
        // }
    }

    render() {
        const fieldsCompleted = this.props.signUpForm && allFieldsCompleted(this.props.signUpForm);
        const isSubmitDisabled = this.props.signUpForm && hasErrors(this.props.signUpForm) && !fieldsCompleted;
        return (
            <div className="formContainer">
                <SignUpForm
                    isSubmitDisabled={isSubmitDisabled} 
                    handleSubmit={this.handleSubmit}
                />
                {this.props.isAuthenticated && (
                    <Redirect to="/me"/>
                )}
            </div>
        );
    }
}
export default connect(state => ({
    signUpForm: state.form.signup,
    // sessionId: state.user.get('sessionId'),
    isAuthenticated: state.user.get('isAuthenticated')
}), {
        signUpUser
    })(SignUpFormContainer);