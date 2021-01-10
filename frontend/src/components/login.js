import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = 'YOUR_CLIENT_ID.apps.googleusercontent.com';

export default function Login() {
    const onSuccess = (res) => {
        console.log('[Login Success] curentUser:', res.profileObj);
    };
    const onFailure = (res) => {
        console.log('[Login Failed] res:', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    )
}