import { useLocation } from 'react-router-dom';
import "./index.css"
export default function BlogDetails() {

    const state = useLocation().state
    const { title, abstract, content } = state.article

    return (
        // 版心
        <div className="containerDetail">
            {/* <!-- 博客的标题 --> */}
            <div className="containerContent">
                <div className="title">
                    <h4>{title}</h4>
                </div>
                {/* <!-- 博客的内容 --> */}
                <div className="abstract">
                    <p>{abstract}</p>
                </div>
                <div className="content">
                    <p>
                        {content}
                    </p>

                </div>
            </div>
        </div>
    )
}