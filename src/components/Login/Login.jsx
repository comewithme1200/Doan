import React from 'react';
import styles from "./Login.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Login = () => {
    const [loginStatus, setLoginStatus] = React.useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const loginData = {
            email: getData.email,
            password: getData.password
        }

        axios.post('users/login', loginData).then(res => {
            console.log(res.status);
            localStorage.setItem('token', res.data.token);
        }).catch(err => {
            console.log(err);
        })
    };

    const getData = {}

    return (
        <div className={styles.login_container}>
            <form onSubmit={handleLogin}>
                <div className={styles.h3_container}>
                    <h1>Login</h1>
                </div>
                {loginStatus === 'error' && (
                    <div className={styles.error}>*Sai thông tin đăng nhập</div>
                )}
                <div className='form-group'>
                    <label>Email</label>
                    <input type="email" className='form-control' placeholder='Email' onChange={e => getData.email = e.target.value}/>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type="password" className='form-control' placeholder='Password' onChange={e => getData.password = e.target.value}/>
                </div>

                <div className={styles.button_container}>
                    <button className='btn btn-primary btn-block'>Đăng nhập</button>
                </div>
                
            </form>
        </div>
    );
};

export default Login;