import "./index.css"
import { Card, Space, Pagination } from 'antd';
import { useState, useEffect } from "react";
import mockRequests from '../../utils/mockAxios'
import { useNavigate } from "react-router-dom";
import '../../assets/icon/iconfont.css'
export default function BlogList() {
    const [listData, setListData] = useState([])
    const [pageData, setPageData] = useState({ currentPage: 1, totalPage: 30 })



    const navigate = useNavigate()

    const reqArticalList = async (currentPage, pageSize) => {
        const result = await new Promise((resolve, reject) => {
            mockRequests.get('/articleList', {
                params: { id: 1, currentPage: currentPage, pagesize: pageSize }
            })
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
        if (result.code === 200) {
            setPageData({ currentPage: currentPage, totalPage: result.total })
            setListData(result.data)
        } else {
            return Promise.reject(new Error("fail"))
        }
    }

    useEffect(() => {
        handleChange()
    }, [])

    // 分页
    // 根据传入的页面值，计算并截取数组的部分数据，作为相应页面的数据.page=1初始化当前页数。如果没有初始化，分页器就不会显示聚焦第一页
    const handleChange = (page = 1, pageSize = 6) => {
        reqArticalList(page, pageSize)
    }
    const moreHandleClick = (article) => {
        return (event) => {
                navigate('/blogdetails', { state: { article: article } })
        }
    }
    const editArticle = (article) => {
        return (event) => {
            if (window.sessionStorage.getItem("token")) {
                // navigate("/blog")
                navigate('/blog', { state: { article: article } })
              }else{
          
                alert("请先登录！")
                navigate("/login")
          
              }
        }
    }

    const cardCss = {
        width: "700px",
        height: "120px",
        backgroundColor: "white",
        overflow: "scroll",
        border: "1px solid #BBA36A"
    }

    return (
        <div className="BlogList">
            {/* 列表数据展示 */}
            <Space direction="vertical" size={16} >
                {
                    listData.map(item => {
                        return (
                            <div className="i-container" key={item.id}>
                                <Card
                                    className="card"
                                    // key={item.id}
                                    title={item.title}
                                    headStyle={{ color: "#826E6E" }}
                                    // 页面跳转
                                    extra=
                                    {<a onClick={moreHandleClick(item)}>More</a>}
                                    // {<span><NavLink></NavLink></span>}
                                    style={cardCss}
                                    hoverable={true}
                                >
                                    <p>{item.content}</p>
                                </Card>
                                <span className="iconfont icon-yongyan" onClick={editArticle(item)}></span>
                            </div>
                        )
                    })
                }
            </Space>
            {/* 分页导航：current(当前页数)，
            defaultCurrent(默认的当前页数)，
            defaultPageSize(默认的每页条数 ),
            pageSize(每页条数),
            total(总条数)，
            onChange（页码或 pageSize 改变的回调，参数是改变后的页码及每页条数function(page, pageSize)）*/}
            <div className="pagination-container" >
                <Pagination defaultCurrent={1}
                    current={pageData.currentPage}
                    defaultPageSize={6}
                    total={pageData.totalPage}
                    onChange={handleChange} />
            </div>

        </div>
    )
}