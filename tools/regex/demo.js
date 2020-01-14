// // 贪婪匹配与非贪婪匹配
// var str = "aababbb";
// var reg = /a+/g;
// console.log(str.match(reg)); // ["aa"]
// // 改为非贪婪匹配，用?，能匹配一次绝对不匹配多次
// var reg = /a+?/g;
// console.log(str.match(reg)); // ["a","a","a"]



















// js正则基本用法
// test and match
// const regex = /\D/g;
// const str = 'abcdelkjl';
// const notMatchStr = '122';
// console.log(regex.test(str))
// console.log(str.match(regex))
// console.log(regex.test(notMatchStr))
// console.log(notMatchStr.match(regex))












// js正则基本用法
// replace 
// ========================
// var ary = ["一", "二", "三", "四", "五", "六"]
// var newAry = "456123".replace(/\d/g, function (i) {
//     console.log(i)
//     return ary[i - 1];
// })
// console.log(newAry)













// 分组
// var re = /(\w+) (\w+)/;
// var str = "John Smith";
// var newstr = str.replace(
//     re, "My first name is $1. My last name is $2."
// );
// console.log(newstr);








// what about the whole match?  I am ...











// 使用场景一：从字符串中提取出符合特定格式的子字符串:
// 1. 提取出 @Emran @Raju @Noman
// 2. 保留原话，去掉 @ 字符
// const str =
// 'All of us except @Emran, @Raju and @Noman was there';




















// answer =============================






// console.log(str.match(/@\w+/g));
// console.log(str.replace(/@(\w+)/g, '$1'))











// []里面的是个项目编号，现在想提取出项目编号 T1916323
// const str = '[T1916323] 车主运营分析平台'

















// answer =============================








// console.log(str.match(/\[([A-Z]\d{7})\]/g))







// how to remove [] ?












// console.log(str.replace(/^\[([A-Z]\d{7})\].+$/g, '$1'))





// 使用场景二：识别有效的token

// 格式：
// - 由数字组成
// - 用‘-’分割开
// - 第一组和最后一组为2个数字，中间的三组为4个数字,如：
// const str = '78-1234-4567-1711-17'






















// 分组的嵌套
// const regex = /(\d{2})-((\d{4}-){3})(\d{2})/g
// console.log(str.match(regex))





















// 加上 ^ $