
// const Mock = require('mockjs')
import Mock from "mockjs";
const Random = Mock.Random

export default Mock.mock('/register','post',(options)=>{
    return {code:200}
})

Mock.mock('/login','post',{
        code:200,
        data:{
            id: 1,
            token:"6265522223644"
        }
})

let arrList = []
for(let i=0;i<6;i++){
    let newArticalObject ={
        id : Random.integer(1,1000),
        username: "cherry",
        title: Random.csentence(15,20),
        abstract:  Random.csentence(50,100),
        content: Random.cparagraph(99)
    }
    arrList.push(newArticalObject)
}
// 请求带参数，接口url写为正则匹配，否则匹配不到就报错
// Mock.mock(RegExp(API_URL.LOGIN + ".*")

function regUrl(url){
    return RegExp(url+".*")
}
// 文章列表

Mock.mock(regUrl(`/articleList`),'get',{
    code:200,
    total: 30,
    data: arrList
})

Mock.mock('/publish','post',(options)=>{
    console.log("options:",options)
    return{
        code:200,
        // data: options
    }
})

Mock.mock('/updateArticle','post',(options)=>{
    console.log("options",options)
    return{
        code:200,
    }
})