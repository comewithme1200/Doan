import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import images from '../../constants/images';
import './Navbar.css';
import { useDispatch } from 'react-redux';
import { toggleLoginScreen, toggleMainScreen } from '../../redux/action';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const dispatch = useDispatch();
  const handleLoginBtn = () => {
    dispatch(
      toggleLoginScreen()
    );
  };
  const handleLogoClick = () => {
    dispatch(
      toggleMainScreen()
    );
  };
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.gericht} alt="app__logo" onClick={() => handleLogoClick()}/>
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans"><a href="#schedual">Lịch chiếu</a></li>
        <li className="p__opensans"><a href="#system">Hệ thống rạp</a></li>
        <li className="p__opensans"><a href="#sale">Khuyến mãi</a></li>
        <li className="p__opensans"><a href="#about">Về chúng tôi</a></li>
      </ul>
      <div className="app__navbar-login">
        <a href="#login" className="p__opensans" onClick={() => handleLoginBtn()}>ĐĂNG NHẬP</a>
        <div />
        <a href="/" className="p__opensans">MUA VÉ</a>
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
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