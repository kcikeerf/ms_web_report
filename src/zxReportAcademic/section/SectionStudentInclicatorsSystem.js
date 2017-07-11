import React, {Component} from 'react';
import ChartRadarDefault from '../component/ChartRadarDefault';
import ChartBarDefault from '../component/ChartBarDefault';
import TableDefault from '../component/TableDefault';
import ChartScatterDefault from '../component/ChartScatterDefault';
let config = require('zx-const')[process.env.NODE_ENV];

//处理一级指标雷达图的方法
export function handleChartRadarInclicatorsLv1Data(reportType, legends, minData, dimension, otherReportData) {
    let chartRadarData = {
        keys: [],
        legend: [],
        data: []
    };
    let rawData = [];
    //主要数据
    rawData.push(minData.data[dimension]);

    //其他数据
    if (otherReportData.length > 0) {
        //先排序
        otherReportData.sort(function (x, y) {
            let val1 = Number(x.order);
            let val2 = Number(y.order);
            return val1 > val2;
        })

        for (let i = 0; i < otherReportData.length; i++) {
            rawData.push(otherReportData[i].data.data[dimension]);
        }
    }

    let keys = [], data = [];
    for (let i = 0; i < rawData.length; i++) {
        let tmpData = [];
        let lvnData = rawData[i].lv_n;

        for (let j = 0; j < lvnData.length; j++) {
            for (let index in lvnData[j]) {
                let lvnObj = lvnData[j][index];
                if (i === 0) {
                    keys.push(lvnObj.checkpoint);
                }
                tmpData.push((lvnObj.weights_score_average_percent * 100).toFixed(2));
            }
        }
        data.push({
            name: legends[i],
            values: tmpData
        })
    }

    chartRadarData.keys = keys.reverse();
    chartRadarData.legend = legends;
    chartRadarData.data = data;

    return chartRadarData;
}
export function handleTableInclicatorsLv1Data(reportType, header,minData, dimension, otherReportData){
    let inclicatorsLv1TableData = {
        reportType: reportType,
        tHeader: [],
        tData: []
    };

    let rawData = [];
    //主要数据
    rawData.push(minData.data[dimension]);
    //其他数据
    if (otherReportData.length > 0) {
        //先排序
        otherReportData.sort(function (x, y) {
            let val1 = Number(x.order);
            let val2 = Number(y.order);
            return val1 < val2;
        })

        for (let i = 0; i < otherReportData.length; i++) {
            rawData.push(otherReportData[i].data.data[dimension]);
        }
    }

    let label = [], data = [];
    for (let i = 0; i < rawData.length; i++) {
        let tmpData = [];
        let lvnData = rawData[i].lv_n;
        let checkpoint;
        for (let j = 0; j < lvnData.length; j++) {
            for (let index in lvnData[j]) {
                let lvnObj = lvnData[j][index];
                if(i==0){
                    checkpoint = lvnObj.checkpoint;
                }
                let score_percent = (lvnObj.weights_score_average_percent * 100).toFixed(2);
                tmpData.push();
            }
        }

        data.push(tmpData);
    }

}