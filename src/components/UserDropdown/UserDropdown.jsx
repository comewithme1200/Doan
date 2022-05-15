import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Button } from 'antd';
import { userInfoSelector } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fillUserInfo } from '../../redux/action';
import { Link } from 'react-router-dom';

const UserDropdown = () => {

    const userInfo = useSelector(userInfoSelector);

    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(fillUserInfo({
        name: '',
        level: '',
        token:''
      }))
    }

    const menu = (
      <Menu>
        <Menu.Item><Link to="/">Lịch sử</Link></Menu.Item>
        <Menu.Item><a onClick={() => handleLogout()}>Đăng xuất</a></Menu.Item>
      </Menu>
    );
      

    return (
        <Dropdown overlay={menu} placement="bottom">
            <Button>{userInfo.name}</Button>
        </Dropdown>
    );
};

export default UserDropdown;