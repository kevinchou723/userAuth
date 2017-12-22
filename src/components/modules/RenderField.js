import React from 'react';

const RenderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => {
    return (
        <div className="fieldWrapper">
            <input {...input} className={`fieldInput ${touched && error ? 'error' : ''}`} id={label+'Field'} placeholder={label} type={type} />
            <div className={`fieldError ${touched && error ? 'show' : ''}`}>{error}</div>
        </div>
    );
}

export default RenderField;