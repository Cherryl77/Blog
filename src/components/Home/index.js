import "./index.css";
import { Divider } from 'antd';
import { useState, useEffect } from 'react'

const Home = () => {
    const [showTime,setShowTime] = useState("")

    const formateData = (time) => {
        if(!time) return ''
        let date = new Date(time)
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-" + date.getDate() + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const stime = formateData(new Date().getTime());
            setShowTime(stime)
        }, 1000);
        return () => { // 每次卸载都执行此函数，清楚定时器
            clearTimeout(timer)
        };
    }, []);

    return (
        <div className="container">
            <div className="container-left">
                <div className="one"><p>Welcome to blog</p></div>
                <div className="two"></div>
            </div>
            <div className="container-right">
               <p>today,</p>
                <Divider className="diver" />
                <p>{showTime}</p>
                <Divider className="diver" />
                <p>This is my first project based on the react framework. </p>
                <Divider className="diver" />
                <p>The outside world may be wonderful or helpless. Once our wings have grown, we should fly.
                </p>
                <Divider className="diver" />
            </div>
        </div>
    )
}
export default Home;