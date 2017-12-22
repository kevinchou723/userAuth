import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { email, required } from '../../utils/validation';
import RenderField from './RenderField';

let LoginForm = ({ handleSubmit, isSubmitDisabled, flashMessage }) => {
    return (
        <form className="formWrapper" onSubmit={handleSubmit}>
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
                Login
            </button>
            <div className={`flashMessage ${flashMessage != "" ? 'show' : ''}`}>{flashMessage}</div>
        </form>
    );
}

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);

export default LoginForm;