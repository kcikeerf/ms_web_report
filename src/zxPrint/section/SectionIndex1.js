import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // ES6
import {Map, is} from 'immutable';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import '../../style/style-report.css';
import tinymce from 'tinymce/tinymce.min';
import logo from 'zx-img/logo1.svg';
import fun from '../misc/fun';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import TinyMCE from 'react-tinymce';

let filesaver = require('filesaver.js/FileSaver.min.js');
let htmlDocx = require('html-docx-js/dist/html-docx.js');
let config = require('zx-const')[process.env.NODE_ENV];

export class SectionIndex extends Component {
    handleEditorChange(e) {
        console.log(e.target.getContent());
    }

    convertImagesToBase64 (contentDocument) {

        var regularImages = $("img");
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        [].forEach.call(regularImages, function (imgElement) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            ctx.drawImage(imgElement, 0, 0);
            var dataURL = canvas.toDataURL();
            imgElement.setAttribute('src', dataURL);
        });
        canvas.remove();
        return contentDocument;
    }

    a(){
        var contentDocument = $('#content').html();
        this.convertImagesToBase64(contentDocument);
        let html = $(contentDocument).html();
        var converted = htmlDocx.asBlob(html);
        filesaver.saveAs(converted, 'test.docx',{type: 'utf-8'});
    }

    handleChange(value) {
        this.setState({text: value})
    }

    componentDidMount() {
        let quizDetailsApi = config.API_DOMAIN + config.API_QUIZS_DETAILS;
        let quizDetailsData = {
            access_token: 'ea04e1384798d70fe39a17b203656778c2523d6bf5470732c934b8052df532c8',
            test_id: '597efeadfa331806d5a755ce',
            qzp_id: '597f4f0ffa331806dea756df',
            user_name: null
        };

        let quizDetailsPromis = $.post(quizDetailsApi, quizDetailsData);
        quizDetailsPromis.done(function (response) {
            this.setState({
                text:`${response.quiz_body}${response.qzp_answer}`
            });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <TinyMCE/>
            </div>
        );
    }
}

export default SectionIndex;


/*
*             <div class='box'>
                <i class="material-icons" onClick={this.print.bind(this)}>local_printshop</i>
                <div class='test'>
                    123
                </div>
                <div class='logo'>
                    <img src={logo} alt='logo'></img>
                </div>
                <div class='titlt'>
                    <p>数学 错题本</p>
                    <p>INCORRECT ITEM COLLECTION</p>
                </div>
                <div class='info'>
                    <p>福州市晋安区 2017-2018 学年第一学期九年级期中测试</p>
                    <p>晋安区第十中学 十一班</p>
                    <p>王小二</p>
                </div>
                <div class='foot'>
                    <p>甄学测评数据中心 甄学产品研发中心</p>
                </div>

            </div>
*
* */