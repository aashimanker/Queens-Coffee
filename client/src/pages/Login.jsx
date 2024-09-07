import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/login.css";

function Login({ setLoggedIn }) {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState({
        name: "",
        password: ""
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAdmin({
            ...admin,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userDetails = await axios.post("http://localhost:5000/api/auth/login", admin);
            console.log(userDetails.data);
            console.log(userDetails.status);

            if (userDetails.status === 200) {
                setLoggedIn(true);
                navigate("/Menu");
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <>
            <div className='login-background'>
                <div className="container-box">
                    <div className="artwork"></div>
                    <div className="login-box">
                        <h1>Welcome</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="textbox">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    id='name'
                                    required
                                    autoComplete='off'
                                    value={admin.name}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="textbox">
                                <input
                                    type="text"
                                    placeholder="Password"
                                    name="password"
                                    id='password'
                                    required
                                    autoComplete='off'
                                    value={admin.password}
                                    onChange={handleInput}
                                />
                            </div>
                            <button type="submit" className="btn">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
