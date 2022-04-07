import React from 'react';
import styles from "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login");
        const loginData = {
            email: getData.email,
            password: getData.password
        }

        axios.post('users/login', loginData).then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.token);
        }).catch(err => {
            console.log(err);
        })
    };

    const getData = {}

    return (
        <form onSubmit={handleLogin}>
            <h3>Login</h3>
            <div className='form-group'>
                <label>Email</label>
                <input type="email" className='form-control' placeholder='Email' onChange={e => getData.email = e.target.value}/>
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input type="password" className='form-control' placeholder='Password' onChange={e => getData.password = e.target.value}/>
            </div>

            <button className='btn btn-primary btn-block'>Login</button>
        </form>
    );
};

export default Login;