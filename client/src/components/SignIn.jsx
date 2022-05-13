import React from 'react';
import RegistrationForm from './RegistrationForm';
import LogInForm from './LogInForm';

const SignIn = () => {
    return (
        <div>
            <h1>Welcome</h1>
            <div className="row">
                <div className="col">
                    <RegistrationForm />
                </div>
                <div className="col">
                    <LogInForm />
                </div>
            </div>
        </div>
    )
}

export default SignIn;