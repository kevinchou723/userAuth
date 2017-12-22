import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { email, required } from '../../utils/validation';
import RenderField from './RenderField';

let SignUpForm = ({handleSubmit, isSubmitDisabled, flashMessage}) => {
    return (
        <form className="formWrapper" onSubmit={handleSubmit}>
            <Field
                name="fullname"
                component={RenderField}
                type="text"
                label="Firstname Lastname"
                validate={[required]}
            />
            <Field
                name="email"
                component={RenderField}
                type="email"
                label="Email"
                validate={[required, email]}
            />
            <Field
                name="password"
                component={RenderField}
                type="password"
                label="Password"
                validate={[required]}
            />
            <button className={`submitButton ${isSubmitDisabled ? 'disabled' : ''}`} type="submit">
                Sign Up
            </button>
            <div className={`flashMessage ${flashMessage != "" ? 'show' : ''}`}>{flashMessage}</div>
        </form>
    );
}

SignUpForm = reduxForm({
    form: 'signup'
})(SignUpForm);

export default SignUpForm;