import React, {useEffect, useRef, useState} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";
import {checkUserStatus} from "../redux-store/actions/auth";
import {Redirect} from "react-router-dom";
import {UNAUTHORIZED} from "../constants/constants";
import {logOut} from "../redux-store/actions/auth";
import { Avatar,Menu,Dropdown} from 'antd';
import { UserOutlined,LockOutlined,SettingOutlined,UserAddOutlined,CloseOutlined} from '@ant-design/icons';
import ChangePassword from "../components/ChangePassword";
import CustomModal from "../components/CustomModal";
import CreateAdmin from "../components/CreateAdmin";

const NavBar = () => {
    const dispatch = useDispatch();

    const change_password_ref = useRef();
    const create_admin_ref = useRef();

    const [activeLink,setActiveLink] = useState("/");
    const authenticated = useSelector(state=>state.auth.authenticated);
    const auth_status = useSelector(state=>state.auth.auth_status);
    const superUser = useSelector(state=>state.auth.is_superuser);
    console.log(superUser)
    const [showPassword,setShowPassword] = useState(false);
    const [showCreateAdmin,setShowCreateAdmin] = useState(false);


    useEffect(()=>{
        dispatch(checkUserStatus());
    },[])

    if(auth_status === UNAUTHORIZED){
        return <Redirect to={"/login"} />
    }
    if(!authenticated){
        return ""
    }
    const handleLogOut = ()=>{
        dispatch(logOut());
    }
    const menu = (
        <Menu style={{ width: 256 }}>
            {superUser&&<Menu.Item key="1" icon={<UserAddOutlined />} onClick={()=>setShowCreateAdmin(true)}>
                Add user
            </Menu.Item>}
            <Menu.Item key="2" icon={<SettingOutlined />} onClick={()=>setShowPassword(true)}>
                Change password
            </Menu.Item>
            <Menu.Item key="3" icon={<CloseOutlined/>} onClick={handleLogOut}>
                Logout
            </Menu.Item>
        </Menu>
    );
    const handleChangePasswordClose = ()=>{
        setShowPassword(false);
    };
    const handleChangePasswordSubmit = ()=>{
        change_password_ref.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
        );
    };
    const handleCloseCreateAdmin = ()=>{
        setShowCreateAdmin(false);
    };
    const handleCreateAdminSubmit = ()=>{
        create_admin_ref.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
        );
    }
    return (
        <Nav activeKey={activeLink}>
            <Nav.Item>
                <Nav.Link eventKey={"/"}><Link to={"/"}>Home</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={"/news"}><Link to={"/news"}>News</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={"/gallery"}><Link to={"/gallery"}>Gallery</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={"/schedule"}><Link to={"/schedule"}>Schedule</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  eventKey={"/appointment"}><Link to={"/appointment"}>Appointments</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  eventKey={"/requests"}><Link to={"/requests"}>Requests</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar size={40} icon={<UserOutlined />} />
                </Dropdown>
            </Nav.Item>
            <CustomModal show={showPassword} handleClose={handleChangePasswordClose}
                         title={"Change Password"} submit={handleChangePasswordSubmit}>
                <ChangePassword form_ref={change_password_ref} handleClose={handleChangePasswordClose}/>
            </CustomModal>
             <CustomModal show={showCreateAdmin} handleClose={handleCloseCreateAdmin}
                                         title={"Create Admin"} submit={handleCreateAdminSubmit}>
                <CreateAdmin form_ref={create_admin_ref} handleClose={handleCloseCreateAdmin} />
            </CustomModal>


        </Nav>
    );
};

export default NavBar;
