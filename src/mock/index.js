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

const testData2 = Mock.mock('http://localhost:8080/discuss/queryTitle/', 'post', {

    status: 400, //请求成功状态码
    data: [{
        id: 34,
        isTop: true,
        isOver: true,
        submitNumber: 100,
        replyNumber: 25,
        title: "1",
        url: "404",
        content: "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
            "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
            "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
            "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
            "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja",
        tags: ['P7', 'P8'],
        name: "Zhang_kg",
        time: "2022-10-1",
        isLike: false
    },
        {
            id: 35,
            isTop: false,
            isOver: true,
            submitNumber: 100,
            replyNumber: 25,
            title: "2",
            url: "404",
            content: "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja",
            tags: ['P7', 'P8'],
            name: "Zhang_kg",
            time: "2022-10-1",
            isLike: false
        },
        {
            id: 36,
            isTop: true,
            isOver: true,
            submitNumber: 100,
            replyNumber: 25,
            title: "3",
            url: "404",
            content: "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja" +
                "asdjfalsfjaldfkjaldskfajldfkjaldfjalkdfjalkdfalsdkfjalkdfjaldkfjaldkfjaldkfja",
            tags: ['P7', 'P8'],
            name: "Zhang_kg",
            time: "2022-10-1",
            isLike: false
        },]
})

//导出
// export default testData
export default {testData2, 
    // testData
}; 
