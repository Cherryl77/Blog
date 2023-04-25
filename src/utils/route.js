// 存放通过API获取到的数据
import { Navigate } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Blog from "../components/Blog";
import BlogList from "../components/BlogList";
import BlogDetails from "../components/BlogDetails"

const route = [
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/blog",
        element: <Blog />
    },
    {
        path: "/bloglist",
        element: <BlogList />,

    },
    {
        path: "blogdetails",
        element: <BlogDetails />
    },
    {
        path: '/',
        element: <Navigate to='/home' />
    }

]
export default route;