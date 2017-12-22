// validate required
export const required = (value) => (value ? undefined : 'Required');

// validate email
export const email = (value) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;
}

// check if there are errors
export const hasErrors = (form) => {
    if (!form.syncErrors) {
        return false;
    }else{
        return Object.keys(form.syncErrors).length > 0;
    }
}

// check if all fields are filled and no errors
export const allFieldsCompleted = (form, hasErrors) => {
    return form.registeredFields && form.values && !hasErrors && Object.keys(form.registeredFields).length == Object.keys(form.values).length;
}