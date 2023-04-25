import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom'
import "./index.css"
import mockRequests from '../../utils/mockAxios'

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
const Register = () => {
    // 通过 Form.useForm 对表单中数据域进行交互
    const [form] = Form.useForm();
    // 
    const navigate = useNavigate();
    function reqRegister(userInfo) {
        // 必须返回一个promise对象，下面调用时才能拿到对象，奴然await不起作用
        return new Promise((resolve,reject)=>{
            mockRequests.post("/register",{
                data:{
                    name:userInfo.name,
                    password:userInfo.password
                }
            }).then(res=>{
               resolve(res.data)
            },error=>{
                console.log(error)
                reject(new Error(error))
            })
        })
    }

    async function onFinish(values){
         // 表单点击提交触发的方法, // values是表单中的值
        console.log("注册提交")
        let userInfo = {name:values.nickname,password:values.password}
        // 发送请求
        let result = await reqRegister(userInfo)
        if(result.code === 200){
//          注册成功,页面跳转到登录页
            navigate('/login')
        }else{
            alert("注册失败！")
        }
    };




    return (
        <div>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                className="register-form"
                onFinish={onFinish}
                style={{
                    maxWidth: 450,
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="nickname"
                    label="Nickname"
                    tooltip="What do you want others to call you?"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your nickname!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    // 当字段间存在依赖关系时使用。一种常见的场景，就是注册用户表单的“密码”与“确认密码”字段。“确认密码”校验依赖于“密码”字段，设置 dependencies 后，“密码”字段更新会重新触发“校验密码”的校验逻辑。
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    {/* htmlType为submit的方法会触发onFish方法，也就是表单的提交方法 */}
                    <Button type="primary" htmlType="submit" className="register-button" onClick={reqRegister}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Register;