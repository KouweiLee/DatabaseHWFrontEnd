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

const testData2 = Mock.mock('http://localhost:8080/course/course/single', 'post', {

    status: 200, //请求成功状态码
    data: {
        id: 1,
        name: "走进超算",
        // isChoosed: false,
        // teacher: "张三",
        time: "周一上午第三、四节课",
        position: "主楼101",
        description: "从初学者的视角理解超算从初学者的视角理解超算从初学者的视角理解超算从初学者的视角理解超算从初学者的视角理解超算从初学者的视角理解超算从初学者的视角理解超算从初学者的视角理解超算",
        // content: ['学1', '学2', '学3'],
        // grade: [
        //     {
        //         percent: 60,
        //         name: "考试"
        //     },
        //     {
        //         percent: 40,
        //         name: "平时"
        //     }
        // ]
    }
})

//导出
// export default testData
export default {testData2, 
    // testData
}; 
