import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Link,useNavigate} from "react-router-dom"
import { Button, Form, Input } from 'antd';
import "./index.css"
import mockRequests from '../../utils/mockAxios'

const Login = () => {
    const navigate = useNavigate();
    const reqLogin = (userInfo)=>{
        return new Promise((resolve)=>{
            mockRequests.post("/login",userInfo).then(res=>{
                resolve(res)
            }).catch(error=>{
                console.log("登陆失败",error)
            })
        })
    }
    const onFinish = async(values) => {
        if(!window.sessionStorage.getItem('username')){
            // 发送请求
            let userInfo = {name:values.username,password:values.password}
            let result = await reqLogin(userInfo)
            if(result.data.code === 200){
                // 登陆成功，把token存入sessionStorage
                // 跳转到首页
                window.sessionStorage.setItem("userId",result.data.data.id)
                window.sessionStorage.setItem("username",values.username)
                window.sessionStorage.setItem("token",result.data.data.token)

                // 登陆成功后，回跳到用户进入的前一个页面
                const baseURL = window.sessionStorage.getItem("baseURL")
                if(baseURL === "http://localhost:3000"){
                    // 匹配成功，删除本地存储的地址，避免占用内存过多，进行回跳
                    window.sessionStorage.removeItem("baseURL")
                    navigate(-1)
                }else{
                    // 否则跳转到指定页面
                    navigate("/home")
                }
            }
        }else{
            alert("您已登录！")
        }
    };
    
    




    return (
        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
            </Form.Item>
        </Form>
    );
};
export default Login;