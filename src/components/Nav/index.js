import "./index.css"
import { useState, useEffect } from 'react';
import { Menu,Alert } from 'antd';
import { Link, useNavigate, useLocation } from "react-router-dom"

const Nav = () => {
  const [username, setUsername] = useState("请登录!")
  const [selectedKeys, setSelectedKeys] = useState(['home'])
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (window.sessionStorage.getItem("token")) {
      let username = window.sessionStorage.getItem("username")
      setUsername(username)
    }
  }, [window.sessionStorage.getItem("username")]);



  const update = () => {
    let rank = ""
    // 获取当前路径
    const pathname = location.pathname
    // 获取当前目录所在的层级
    if (pathname) {
      rank = pathname.split('/')
      setSelectedKeys([pathname])
    }
    console.log("rank,", rank)
  }

  const hanldeClick = (e) => {
    console.log(e.key)
    setSelectedKeys(e.key)
    // update()
    if(e.key==="blog"){
      if (window.sessionStorage.getItem("token")) {
        // const pathUrl = location.pathname
        navigate("/blog")
      }else{
  
        alert("请先登录！")
        navigate("/login")
  
      }
    }
  }


    function logout() {
      if (window.sessionStorage.getItem("token")) {
        // 清除保存的所有数据
        sessionStorage.clear();
        navigate("/home")
        window.location.reload() 
      }
      return null
    }

    //？？解决页面刷新 路由不变导航跳转到首页（因为menu默认是首页）
    // useEffect(() => {
    // const update = () => {
    //   let rank = ""
    //   // 获取当前路径
    //   const pathname = location.pathname
    //   // 获取当前目录所在的层级
    //   if(pathname){
    //      rank = pathname.split('/')
    //      setSelectedKeys([pathname])
    //   }
    //   console.log("rank,",rank)
    // }
    // console.log("rank,",rank)
    // switch(rank.length){
    //   case 2: setSelectedKeys([pathname])
    //           break;
    //   case 3: setSelectedKeys([pathname]);
    //          setOpenKeys(rank.slice(0, 2).join('/'))
    //            break;
    // }
    // }, [selectedKeys]);
    const userNameTag = { label: username, key: "username", className: "userName" }
    const homeTag = { label: <Link to="/home">首页</Link>, key: "home" }
    const bloglistTag = { label: <Link to="/bloglist">日志</Link>, key: "bloglist" }
    const blogTag = { label: <Link to="/blog">记录</Link>, key: 'blog' }
    const loginTag = { label: <Link to="/login" >登陆</Link>, key: "login" }
    const registerTag = { label: <Link to="/register">注册</Link>, key: "register" }
    const logoutTag = { label: <span onClick={logout}>退出</span>, key: "logout" }
    const items = [userNameTag, homeTag, bloglistTag, blogTag, loginTag, registerTag, logoutTag]

    return (
      <div>
        <Menu 
          selectedKeys={selectedKeys} onClick={hanldeClick}
          defaultSelectedKeys={selectedKeys} // 菜单默认选中项的key
          mode="horizontal"
          items={items}
        ></Menu>
      </div>
    )
  }
  export default Nav;

