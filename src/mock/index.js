// src/mock/index.js
import Mock from 'mockjs'  //导入mockjs

//使用Mock下面提供的mock方法进行需要模拟数据的封装
//参数1，是需要拦截的完整请求地址，参数2，是请求方式，参数3，是请求的模拟数据
// const testData = Mock.mock('http://localhost:8080/login/login/','post',{
//     status:200, //请求成功状态码
//     dataList:[1,2,3,4,5,6,7,8,9,10] //模拟的请求数据
// })
// const testData = Mock.mock('http://localhost:8000/login/login/', 'post', {
//     status:200
// })

const testData2 = Mock.mock('http://localhost:8000/login/picture/all/', 'post', {

    code: 200, //请求成功状态码
    data: {
        data:[
            '123',
            '1234'
        ],
    }
})

//导出
// export default testData
export default {testData2, 
    // testData
}; 
