import React, { useState  } from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import {
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import firebase from "firebase/compat/app";
import {  useDispatch , useSelector, useStore} from 'react-redux'

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch()
  const history = useHistory()
  const {user} = useSelector((state) => {
      return {...state}
  })
  const {email} = {...user}
  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logOut = () => {
    firebase.auth().signOut()
    dispatch({
      type : "LOGOUT",
      payload : null
    })
    history.push('/login');
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/" >Home </Link>
      </Item>

      {! user && <Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">Register</Link>
      </Item>}

      {!user && <Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="login"> Login</Link>
      </Item>}

      { user && <SubMenu className="float-right" icon={<SettingOutlined />} title={email.split('@')[0]}>
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined />} onClick={logOut}>LogOut</Item>
      </SubMenu>}
    </Menu>
  );
};
export default Header;