import React from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import styles from './SignUp.module.css';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const SignUp = () => {

    const [signupStatus, setSignUpStatus] = React.useState('');

    const navigate = useNavigate();

    function onChange(date, dateString) {
        getData.dob = dateString;    
    }

    const handlesignup = (e) => {

        e.preventDefault();
        if (!getData.password) {
            alert("Chưa nhập mật khẩu");
            return;
        }
        const signupData = {
            email: getData.email,
            password: getData.password,
            name: getData.name,
            phoneNumber: getData.tel,
            dob: getData.dob
        }

        console.log(signupData);

        axios.post('users/register', signupData).then(res => {
            navigate(-1);
        }).catch(err => {
            if (err.response.data.message === 'invalid email or password') {
                setSignUpStatus(err.response.data.message);
            }
            console.log(err.response.data.errors);
        })
    };

    const getData = {}

    return (
        <div className={styles.signup_container}>
            <form onSubmit={handlesignup}>
                <div className={styles.h3_container}>
                    <h1>Đăng ký</h1>
                </div>
                {signupStatus && (
                    <div className={styles.error}>*{signupStatus}</div>
                )}
                <div className='form-group'>
                    <label>Tên</label> 
                    <input type="text" className='form-control' placeholder='Tên' onChange={e => getData.name = e.target.value}/>
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input type="email" className='form-control' placeholder='Email' onChange={e => getData.email = e.target.value}/>
                </div>
                <div className='form-group'>
                    <label>Mật khẩu</label>
                    <input type="password" className='form-control' placeholder='mật khẩu' onChange={e => getData.password = e.target.value}/>
                </div>
                <div className='form-group'>
                    <label>Số điện thoại</label>
                    <input type="tel" className='form-control' placeholder='Số điện thoại' onChange={e => getData.tel = e.target.value}/>
                </div>
                <div className='form-group'>
                    <label>Ngày sinh</label>
                    <DatePicker className='form-control' onChange={onChange} />
                </div>
                

                <div className={styles.button_container}>
                    <button className='btn btn-primary btn-block'>Đăng ký</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;