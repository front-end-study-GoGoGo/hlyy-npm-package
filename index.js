"use strict";
exports.__esModule = true;
exports.areRinseObj = exports.areDataReckon = exports.transferFloat = exports.add = void 0;
var moment_1 = require("moment");
var add = function (a, b) {
    return a + b;
};
exports.add = add;
/**
 * 设置小数展示，小数点后为00则不展示
 * @param num 需要转换的数字
 * @param toFixNum 保留的小数位，默认两位
 * @param roundingOFF 是否对小数四舍五入，默认为是
 * @returns
 */
var transferFloat = function (num, toFixNum, roundingOff) {
    if (toFixNum === void 0) { toFixNum = 2; }
    if (roundingOff === void 0) { roundingOff = true; }
    if (!roundingOff) {
        return Number(num.toFixed(toFixNum) > num ? num.toFixed(toFixNum) - Math.pow(0.1, toFixNum) : num.toFixed(toFixNum));
    }
    if (typeof num !== 'number')
        return 0;
    if (String(num).indexOf('.') !== -1) {
        var arr = String(num).split('.');
        if (arr.length > 2) {
            return num;
        }
        else {
            return Number(num.toFixed(toFixNum));
        }
    }
    else {
        return num;
    }
};
exports.transferFloat = transferFloat;
/**
 * 日期推算算法
 *
 * @param type 需要获取的时间范围
 * @returns 返回的是 [年月日，年月日] //moment格式
 */
var areDataReckon = function (type) {
    var myData = [], year = (0, moment_1["default"])().year(), month = (0, moment_1["default"])().month(), quarter = (0, moment_1["default"])().quarter(), firstDay = 0, lastDay = 0;
    // 时间获取思路一周：按照国外计算方法，获取上周一及本周日时间，即为上周时间
    // moment().year() 获取当前年 返回值number
    // moment().month() 获取月 返回值number 范围为 0-11 
    //  本日
    if (type === '本日') {
        var todayDay = (0, moment_1["default"])(((0, moment_1["default"])().unix()) * 1000).format('YYYY-MM-DD');
        myData = [
            (0, moment_1["default"])(todayDay, 'YYYY-MM-DD'),
            (0, moment_1["default"])(todayDay, 'YYYY-MM-DD')
        ];
    }
    //  上日
    if (type === '上日') {
        var lastDay_1 = (0, moment_1["default"])(((0, moment_1["default"])().unix() - 24 * 60 * 60) * 1000).format('YYYY-MM-DD');
        myData = [
            (0, moment_1["default"])(lastDay_1, 'YYYY-MM-DD'),
            (0, moment_1["default"])(lastDay_1, 'YYYY-MM-DD')
        ];
    }
    // 上周 
    else if (type === '上周') {
        myData = [
            (0, moment_1["default"])((0, moment_1["default"])().day(-6).format('YYYY-MM-DD'), 'YYYY-MM-DD'),
            (0, moment_1["default"])((0, moment_1["default"])().day(0).format('YYYY-MM-DD'), 'YYYY-MM-DD')
        ];
    }
    // 上月
    else if (type === '上月') {
        // // console.log("firstDay, lastDay:", firstDay, lastDay);
        // month = 2;
        switch (month) {
            case 0:
                year -= 1;
                month = 12;
                firstDay = 1;
                lastDay = 31;
                myData = [
                    (0, moment_1["default"])(year + "-" + month + "-0" + firstDay, 'YYYY-MM-DD'),
                    (0, moment_1["default"])(year + "-" + month + "-" + lastDay, 'YYYY-MM-DD')
                ];
                break;
            case 11:
                firstDay = 1;
                lastDay = 30;
                myData = [
                    (0, moment_1["default"])(year + "-" + month + "-0" + firstDay, 'YYYY-MM-DD'),
                    (0, moment_1["default"])(year + "-" + month + "-" + lastDay, 'YYYY-MM-DD')
                ];
                break;
            case 10:
                firstDay = 1;
                lastDay = (0, moment_1["default"])(year + "-" + month, "YYYY-MM").daysInMonth(); //获取当前月份总天数
                myData = [
                    (0, moment_1["default"])(year + "-" + month + "-0" + firstDay, 'YYYY-MM-DD'),
                    (0, moment_1["default"])(year + "-" + month + "-" + lastDay, 'YYYY-MM-DD')
                ];
                break;
            default:
                firstDay = 1;
                lastDay = (0, moment_1["default"])(year + "-0" + month, "YYYY-MM").daysInMonth(); //获取当前月份总天数
                myData = [
                    (0, moment_1["default"])(year + "-0" + month + "-0" + firstDay, 'YYYY-MM-DD'),
                    (0, moment_1["default"])(year + "-0" + month + "-" + lastDay, 'YYYY-MM-DD')
                ];
                break;
        }
    }
    // 上季度
    else if (type === '上季度') {
        switch (quarter) {
            case 1:
                year -= 1;
                firstDay = 1;
                lastDay = (0, moment_1["default"])(year + "-12", "YYYY-MM").daysInMonth();
                myData = [
                    (0, moment_1["default"])(year + "-09-0" + firstDay, 'YYYY-MM-DD'),
                    (0, moment_1["default"])(year + "-12-" + lastDay, 'YYYY-MM-DD')
                ];
                break;
            case 2:
                firstDay = 1;
                lastDay = (0, moment_1["default"])(year + "-03", "YYYY-MM").daysInMonth();
                myData = [
                    (0, moment_1["default"])(year + "-01-0" + firstDay, 'YYYY-MM-DD'),
                    (0, moment_1["default"])(year + "-03-" + lastDay, 'YYYY-MM-DD')
                ];
                break;
            case 3:
                firstDay = 1;
                lastDay = (0, moment_1["default"])(year + "-06", "YYYY-MM").daysInMonth();
                myData = [
                    (0, moment_1["default"])(year + "-04-0" + firstDay, 'YYYY-MM-DD'),
                    (0, moment_1["default"])(year + "-06-" + lastDay, 'YYYY-MM-DD')
                ];
                break;
            case 4:
                firstDay = 1;
                lastDay = (0, moment_1["default"])(year + "-09", "YYYY-MM").daysInMonth();
                myData = [
                    (0, moment_1["default"])(year + "-07-0" + firstDay, 'YYYY-MM-DD'),
                    (0, moment_1["default"])(year + "-09-" + lastDay, 'YYYY-MM-DD')
                ];
                break;
        }
    }
    else if (type === '上年') {
        myData = [
            (0, moment_1["default"])((0, moment_1["default"])().year() - 1 + "-01-01", 'YYYY-MM-DD'),
            (0, moment_1["default"])((0, moment_1["default"])().year() - 1 + "-12-31", 'YYYY-MM-DD')
        ];
    }
    else if (type === '本日') {
        var today = (0, moment_1["default"])(((0, moment_1["default"])().unix()) * 1000).format('YYYY-MM-DD');
        var lastDay_2 = (0, moment_1["default"])(((0, moment_1["default"])().unix()) * 1000).format('YYYY-MM-DD');
        myData = [
            (0, moment_1["default"])(today, 'YYYY-MM-DD'),
            (0, moment_1["default"])(lastDay_2, 'YYYY-MM-DD')
        ];
    }
    else if (type === '近一周') {
        // // console.log('当天时间：', moment((moment().unix()) * 1000).format('YYYY-MM-DD'));
        myData = [
            (0, moment_1["default"])((0, moment_1["default"])(((0, moment_1["default"])().unix() - 7 * 24 * 60 * 60) * 1000).format('YYYY-MM-DD'), 'YYYY-MM-DD'),
            (0, moment_1["default"])((0, moment_1["default"])(((0, moment_1["default"])().unix()) * 1000).format('YYYY-MM-DD'), 'YYYY-MM-DD'),
        ];
    }
    else if (type === '近一月') {
        myData = [
            (0, moment_1["default"])((0, moment_1["default"])(((0, moment_1["default"])().unix() - 30 * 24 * 60 * 60) * 1000).format('YYYY-MM-DD'), 'YYYY-MM-DD'),
            (0, moment_1["default"])((0, moment_1["default"])(((0, moment_1["default"])().unix()) * 1000).format('YYYY-MM-DD'), 'YYYY-MM-DD'),
        ];
    }
    else if (type === '近一年') {
        myData = [
            (0, moment_1["default"])((0, moment_1["default"])(((0, moment_1["default"])().unix() - 365 * 24 * 60 * 60) * 1000).format('YYYY-MM-DD'), 'YYYY-MM-DD'),
            (0, moment_1["default"])((0, moment_1["default"])(((0, moment_1["default"])().unix()) * 1000).format('YYYY-MM-DD'), 'YYYY-MM-DD'),
        ];
    }
    // // console.log("字符串时间：", moment(myData[0]).format('YYYY MM DD'));
    return myData;
};
exports.areDataReckon = areDataReckon;
/**
 *
 * 清空对象空值，返回清洗完的对象
 * @obj 要清洗的对象
 * @timeFormatString 此变量可传可不传 改变时间格式为字符串，待定，暂未写
 * @returns 返回清洗完的对象
 */
var areRinseObj = function (obj, timeFormatString, startTime, endTime) {
    if (timeFormatString === void 0) { timeFormatString = false; }
    var newObj = {};
    // 清洗对象同时对时间格式进行转换
    if (timeFormatString) {
        for (var k in obj) {
            if (obj[k] !== '' && obj[k] !== undefined && obj[k] !== null) {
                if (typeof (obj[k]) === 'object') {
                    newObj["" + startTime] = (0, moment_1["default"])(obj[k][0]).format('YYYY-MM-DD') + ' 00:00:00';
                    newObj["" + endTime] = (0, moment_1["default"])(obj[k][1]).format('YYYY-MM-DD') + ' 23:59:59';
                }
                else {
                    newObj[k] = obj[k];
                }
            }
        }
        return newObj;
    }
    // 纯清洗对象
    for (var k in obj) {
        if (obj[k] !== '' && obj[k] !== undefined && obj[k] !== null) {
            newObj[k] = obj[k];
        }
    }
    return newObj;
};
exports.areRinseObj = areRinseObj;
