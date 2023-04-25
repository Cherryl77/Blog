
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import Nav from "./components/Nav";
import BlogDetails from "./components/BlogDetails"
// 引入富文本编辑器的样式文件
import "react-quill/dist/quill.snow.css";
// 挂载mock
import "./mock/index.js";
// import route from './utils/route'

function App() {
  // const GetRoutes = () => useRoutes(route)
  return (
    // {/* 注册路由 路由组件写法 */}
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route exact path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/bloglist" element={<BlogList />}>
          </Route>
          <Route path="/blogdetails" element={<BlogDetails />}></Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>

  );

}


export default App;
