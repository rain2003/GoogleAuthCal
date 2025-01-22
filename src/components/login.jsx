/* eslint-disable no-unused-vars */
import React from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import "../styles/loginStyles.css";
import GoogleIcon from '@mui/icons-material/Google';
const clientId = "999587599632-qplbd5gbnp4cctf1scn8vc6e41iqjgqv.apps.googleusercontent.com";

function Login() {
    const navigate = useNavigate();

    const onSuccess = (res) => {
        console.log("successfull login", res.profileObj);
        navigate("/calendar");
    };

    const onFailure = (res) => {
        console.log("failed login", res);
    };

    return (
        <div className="header" >
            <h1>Welcome Please LogIn</h1>
            <div className="login-container">
                <div className="login-box">
                    <h1 className="login-header"></h1>
                    <GoogleLogin
                        clientId={clientId}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={"single_host_origin"}
                        isSignedIn={false}
                        scope="https://www.googleapis.com/auth/calendar.readonly"
                        render={(renderProps) => (
                        <button
                            className="custom-google-login-btn"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                        <GoogleIcon className="google-icon" />
                            Sign in with Google
                        </button>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
