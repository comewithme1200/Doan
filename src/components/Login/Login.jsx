import React from 'react';
import styles from "./Login.module.css";
const Login = () => {
    return (
        <div className={styles.wrapper}>
                <form action="#" className={styles.login}>
                    <div className={styles.field}>
                        <input type="text" placeholder="Email Address" required/>
                    </div>
                    <div className={styles.field}>
                        <input type="password" placeholder="Password" required/>
                    </div>
                    <div className={styles.pass_link}>
                        <a href="#">Forgot password?</a>
                    </div>
                    <div className="field btn">
                        <div className={styles.btn_layer}></div>
                        <input type="submit" value="Login"/>
                    </div>
                    <div className={styles.signup_link}>
                        Not a member? <a href="">Signup now</a>
                    </div>
                </form>
        </div>
    );
};

export default Login;