/**
 * Created by jige on 2016/12/1.
 */
// 使用 Mock
var Mock = require('mockjs');
import * as utils from './utils';
//登录
Mock.mock(/.*?\/user\/login$/, 'post', function (options) {
    let data = {
        name: JSON.parse(options.body).username,
        id:1001
    };
    utils.Tools.setCookie("userName", data.name, 30);
    utils.Tools.setCookie("userId", data.id, 30);
    utils.Tools.setCookie("JSESSIONID", '5561ADF51AD165A1D5615FGH1F1G', 30);
    utils.Tools.setCookie("rememberMe", JSON.parse(options.body).rememberMe, 30);

    return {
        code:1,
        bodyData: data,
        message: "登录成功",
        statusCode: 200,
    }
    /*    return	{
     message: "用户名或密码错误！",
     statusCode:300,
     }*/
});

////////////////////////////////用户信息////////////////////////////////////////////////////////////
//用户列表
Mock.mock(/.*?\/user\/getUserList/, 'post', function (options) {
    return {"code":1,"message":null,"bodyData":{"total":1,"bodyData":[
        {"sequenceId":0,"userId":"7f3c87b8b50947f7b28a975349a35857","userName":"lele12","company":"test","email":"zx@163.com","phone":"135","role":'546',"password":"e10adc3949ba59abbe56e057f20f883e","roleName":'角色2',"salt":null,"createDate":null,"updateDate":null,"startDate":1492444800000,"endDate":1492444800000,"regions":["120000","110000"],"date":["2017-04-08","2017-04-18"]},
        {"sequenceId":1,"userId":"7f3c87b8b50947fd7b28a975349a35857","userName":"niciaia","company":"test","email":"zx@163.com","phone":"135","role":'546',"password":"e10adc3949ba59abbe56e057f20f883e","roleName":'角色2',"salt":null,"createDate":null,"updateDate":null,"startDate":1492444800000,"endDate":1492444800000,"regions":["110000"],"date":["2017-04-08","2017-04-18"]}
    ]},"statusCode":200}
});

//删除用户
Mock.mock(/.*?\/user\/delUser$/, 'post', function (options) {
    return {
        statusCode:200,
        message: "删除可用",
        code: 1//0不可以用
    }
});


