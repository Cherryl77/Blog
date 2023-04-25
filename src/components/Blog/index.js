import { Button, Form, Input, message,Alert,Space } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons'
import "./index.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import mockRequests from '../../utils/mockAxios'
import { useNavigate, useLocation } from "react-router-dom";


const Blog = () => {
    const [id, setId] = useState(0)
    const [form] = Form.useForm();
    const content = Form.useWatch('content', form)
    const [messageApi, contextHolder] = message.useMessage();
    // 判断是修改还是新发布，新发布不展示修改按钮
    const [isEdit, setIsEdit] = useState(false)
    const [isShowAlert,setIsShowAlert] = useState("block")

    const navigate = useNavigate()
    const history = useLocation()

    useEffect(() => {
        console.log("先登录")
        if (window.sessionStorage.getItem("token")) {
            setIsShowAlert("none")
            const pathUrl = history.pathname
            console.log(pathUrl)
            navigate(pathUrl)

        }
        console.log("notoken");
    }, []);

    useEffect(() => {
        if (history.state) {
            const { id, title, abstract, content } = history.state.article
            const article = { title: title, abstract: abstract, content: content }
            setId(id)
            form.setFieldsValue(article)
            setIsEdit(true)
        }
    }, []);

    const login = () => {
        navigate("/login")
    }


    const success = () => {
        messageApi.open({
            type: 'success',
            content: '发布成功！',
        });
    }
    const error = () => {
        messageApi.open({
            type: 'error',
            content: '创建失败！',
        });
    };
    // 剩下参数 delta: DeltaStatic, source: Sources, editor: ReactQuill.UnprivilegedEditor


    const reqPublish = (article) => {
        return new Promise((resolve, reject) => {
            mockRequests.post("/publish", {
                params: article
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    // 提交按钮
    const submit = async (e) => {
        e.preventDefault();

        try {
            const values = await form.validateFields()
            console.log('Success:', values);

            // 发送请求
            const title = form.getFieldValue("title")
            const abstract = form.getFieldValue("abstract")
            const contentWithTag = form.getFieldValue("content")
            // const content = contentWithTag.innerHTML
            // console.log("content",content)
            const newArticle = { title: title, abstract: abstract, content: contentWithTag }
            let result = await reqPublish(newArticle)
            console.log("result:", result)
            if (result.data.code === 200) {
                success()
                // 页面跳转到列表页面
                setTimeout(() => {
                    navigate('/bloglist')
                }, 500);
                return "Ok"
            } else {
                error()
                return new Promise(new Error("fail"))
            }
        } catch (error) {
            console.log('Failed:', error);
        }

    }

    
    const success1 = () => {
        messageApi.open({
            type: 'success',
            content: '更新成功！',
        });
    }

    const reqUpdate = () => {
        return new Promise((resolve, reject) => {
            mockRequests.post("/updateArticle",
                { params: id }
            ).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    const update = async (e) => {
        e.preventDefault()

        try {
            await form.validateFields()
            let result = await reqUpdate()
            if (result.data.code === 200) {
                success1()
                // 页面跳转到列表页面
                setTimeout(() => {
                    navigate('/bloglist')
                }, 500);
                return "Ok"
            } else {
                error()
                return new Promise(new Error("fail"))
            }
        } catch (error) {
            console.log('Failed:', error);
        }
    }

    const reset = (e) => {
        e.preventDefault()
        form.resetFields()
    }


    return (
        <div>
            <Form
                name="wrap"
                className="form"
                form={form}
                labelCol={{
                    flex: '60px',
                }}
                labelAlign="left"
                labelWrap
                wrapperCol={{
                    flex: 1,
                }}
                colon={false}
                style={{
                    maxWidth: 1000,
                }}
            >
                <Form.Item
                    label="标题"
                    name="title"

                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="摘要"
                    name="abstract"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="内容"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <ReactQuill
                        //   rules={[{ required: true, message: "\'content\' is required"}]}

                        // Form 仅会对变更的 Field 进行刷新，从而避免完整的组件刷新可能引发的性能问题，因而无法在 render 阶段通过 form.getFieldsValue 来实时获取字段值。
                        theme="snow"
                        value={content}
                        // className
                        onChange={(value) => form.setFieldsValue({ "content": value })} />
                </Form.Item>

                <Form.Item label=" " className="buttons-container">
                    {contextHolder}
                    <Button type="primary" htmlType="submit" className="button" onClick={submit}>
                        Submit
                    </Button>
                    <Button type="primary" htmlType="submit" className="button" onClick={reset}>
                        Reset
                    </Button>
                    {/* visibility不会改变布局，导致重新渲染；但是display:none会改变布局，导致重新渲染 */}
                    <Button type="primary" htmlType="submit" className="button" onClick={update} style={{ visibility: `${isEdit ? "visible" : "hidden"}` }}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
            <Alert
            message="请先登陆！"
            type="warning"
            style={{display:`${isShowAlert}`}}
            action={
              <Space>
                <Button size="small" type="ghost" onClick={login}>
                  Done
                </Button>
              </Space>
            }
            closable
          />
        </div>
    )
}
export default Blog; 