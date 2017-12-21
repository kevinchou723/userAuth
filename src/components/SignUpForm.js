import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { email, required } from '../utils/validation';

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
    <div>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
)

let SignUpForm = ({handleSubmit, isSubmitDisabled}) => {
    return (
        <form className="signUpForm" onSubmit={handleSubmit}>
            <div className="fieldWrapper">
                <Field
                    name="fullname"
                    component={renderField}
                    type="text"
                    label="Firstname, Lastname"
                    validate={[required]}
                />
            </div>
            <div className="fieldWrapper">
                <Field
                    name="email"
                    component={renderField}
                    type="email"
                    label="Email"
                    validate={[required, email]}
                />
            </div>
            <div className="fieldWrapper">
                <Field
                    name="password"
                    component={renderField}
                    type="password"
                    label="Password"
                    validate={[required]}
                />
            </div>
            <button className="submitButton" type="submit" disabled={isSubmitDisabled}>
                Sign Up
            </button>
        </form>
    );
}

SignUpForm = reduxForm({
    form: 'signup'
})(SignUpForm);

export default SignUpForm;