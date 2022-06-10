import React from 'react';
import styles from "./Login.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fillUserInfo } from '../../redux/action'
import axios from 'axios';

const Login = () => {
    const [loginStatus, setLoginStatus] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        console.log(password);
        console.log(email);
        e.preventDefault();
        if (!password) {
            alert("Chưa nhập mật khẩu");
            return;
        }
        const loginData = {
            email: email,
            password: password
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

    return (
        <div className={styles.login_container}>
            <form onSubmit={handleLogin}>
                <div className={styles.h3_container}>
                    <h1>Đăng nhập</h1>
                </div>
                {loginStatus && (
                    <div className={styles.error}>*{loginStatus}</div>
                )}
                <div className='form-group'>
                    <label>Email</label>
                    <input type="email" className='form-control' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type="password" className='form-control' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
                </div>

                <div className={styles.button_container}>
                    <button className='btn btn-primary btn-block'>Đăng nhập</button>
                </div>
                <div className={styles.signup}>
                    <div className={styles.signup_text}>Bạn là người mới?</div>
                    <div className={styles.signup_btn}><Link to='/register' style={{ textDecoration: 'none'}}>Tham gia ngay!!</Link></div>
                </div>
            </form>
        </div>
    );
};

export default Login;