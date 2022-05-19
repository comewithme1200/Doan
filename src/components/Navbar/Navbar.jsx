import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import styles from './Navbar.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { userInfoSelector } from '../../redux/selectors'
import { Link } from 'react-router-dom';
import UserDropdown from '../UserDropdown/UserDropdown';
import { fillUserInfo } from '../../redux/action'
var axios = require('axios');

const Navbar = () => {
  const dispatch = useDispatch();

  const [toggleMenu, setToggleMenu] = React.useState(false);

  const userInfo = useSelector(userInfoSelector);

  React.useEffect(() => {
    if (userInfo.token === '' && localStorage.getItem('token')) {
      
        var config = {
          method: 'get',
          url: '/users',
          headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          dispatch(fillUserInfo({
              user_id: response.data.id,
              name: response.data.name,
              level: response.data.level,
              token: localStorage.getItem('token')
          }))
        
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  const token = userInfo.token;

  return (
    <nav className={styles.app__navbar}>
      <div className={styles.app__navbar_logo}>
        <Link to="/">
          <img src="assets/logo.jpg" alt="app__logo"/>
          <div className={styles.cinema_name}>LC Cinema</div>
        </Link>
      </div>
      <ul className={styles.app__navbar_links}>
        <li className="p__opensans"><a href="#schedual">Lịch chiếu</a></li>
        <li className="p__opensans"><a href="#system">Hệ thống rạp</a></li>
        <li className="p__opensans"><a href="#sale">Khuyến mãi</a></li>
        <li className="p__opensans"><a href="#about">Về chúng tôi</a></li>
      </ul>
      { token === '' && (
      <div className={styles.app__navbar_login}>
          <Link to="/login">
            <a href="#login" className="p__opensans">ĐĂNG NHẬP</a>
          </Link>
      </div>
      )}
      { token !== '' && (
          <UserDropdown />
      )}
      <div className={styles.app__navbar_smallscreen}>
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className={styles.app__navbar_smallscreen_overlay}>
            <MdOutlineRestaurantMenu fontSize={27} className={styles.overlay__close} onClick={() => setToggleMenu(false)} />
            <ul className={styles.app__navbar_smallscreen_links}>
              <li className="p__opensans"><a href="#schedual" onClick={() => setToggleMenu(false)}>Lịch chiếu</a></li>
              <li className="p__opensans"><a href="#system" onClick={() => setToggleMenu(false)}>Hệ thống rạp</a></li>
              <li className="p__opensans"><a href="#sale" onClick={() => setToggleMenu(false)}>Khuyến mãi</a></li>
              <li className="p__opensans"><a href="#about" onClick={() => setToggleMenu(false)}>Về chúng tôi</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;