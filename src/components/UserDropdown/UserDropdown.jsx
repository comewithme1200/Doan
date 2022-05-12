import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Button } from 'antd';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '../../redux/selectors'

const UserDropdown = () => {

    const userInfo = useSelector(userInfoSelector);

    const menu = (
        <Menu
          items={[
            {
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                  Lịch sử mua hàng
                </a>
              ),
            },
            {
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                  Đăng xuất
                </a>
              ),
            }
          ]}
        />
      );
      

    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <Button>{userInfo.name}</Button>
        </Dropdown>
    );
};

export default UserDropdown;