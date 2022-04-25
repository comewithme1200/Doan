import React from 'react';
import styles from "./Login.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fillUserInfo } from '../../redux/action'
import axios from 'axios';

const Login = () => {
    const [loginStatus, setLoginStatus] = React.useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {

        e.preventDefault();
        if (!getData.password) {
            alert("Chưa nhập mật khẩu");
            return;
        }
        const loginData = {
            email: getData.email,
            password: getData.password
        }

        axios.post('users/login', loginData).then(res => {
            navigate(-1);
            dispatch(fillUserInfo({
                user_id: res.data.user.id,
                name: res.data.user.name,
                level: res.data.user.level,
                token: res.data.token
            }))
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
        }).catch(err => {
            if (err.response.data.message === 'invalid email or password') {
                setLoginStatus(err.response.data.message);
            }
            console.log(err.response.data.errors);
        })
    };

    const getData = {}

    return (
        <div className={styles.login_container}>
            <form onSubmit={handleLogin}>
                <div className={styles.h3_container}>
                    <h1>Login</h1>
                </div>
                {loginStatus && (
                    <div className={styles.error}>*{loginStatus}</div>
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