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

let LoginForm = ({ handleSubmit, isSubmitDisabled }) => {
    return (
        <form className="loginForm" onSubmit={handleSubmit}>
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
                Login
            </button>
        </form>
    );
}

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);

export default LoginForm;