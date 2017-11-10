import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import {Map, is} from 'immutable';
import $ from 'jquery';



import logo from 'zx-img/logo.png';

let config = require('zx-const')[process.env.NODE_ENV];


export class SectionReportQuizWrongItem extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div className='box'>
                <div className='logo'>
                    <img src={logo} alt=""></img>
                </div>
                <div className='titlt'>
                    <p>数学 错题本</p>
                    <p>INCORRECT ITEM COLLECTION</p>
                </div>
                <div className='info'>
                    <p>福州市晋安区 2017-2018 学年第一学期九年级期中测试</p>
                    <p>晋安区第十中学 十一班</p>
                    <p>王小二</p>
                </div>
                <div className='foot'>
                    <p>甄学测评数据中心 甄学产品研发中心</p>
                </div>
            </div>
        )
    }
}