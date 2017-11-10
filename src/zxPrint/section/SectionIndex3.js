import React, {Component} from 'react';
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

import {Editor, EditorState} from 'draft-js';
import CKEditor from "react-ckeditor-component";

let filesaver = require('filesaver.js/FileSaver.min.js');
let htmlDocx = require('html-docx-js/dist/html-docx.js');
let config = require('zx-const')[process.env.NODE_ENV];

export class SectionIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.onChange = (evt) => this.setState({value: evt.target.value});
    }

    componentDidMount() {
        let quizDetailsApi = config.API_DOMAIN + config.API_QUIZS_DETAILS;
        let quizDetailsData = {
            access_token: '4120f0c62ddaa7628bbc4baf2ac7f5b374d621b3a18b99db9fb6b4fa7011e4c4',
            test_id: '597efeadfa331806d5a755ce',
            qzp_id: '597f4f0ffa331806dea756df',
            user_name: null
        };

        let quizDetailsPromis = $.post(quizDetailsApi, quizDetailsData);
        quizDetailsPromis.done(function (response) {
            console.log('response',response);
            this.setState({
                value: `${response.quiz_body}${response.qzp_answer}`
            });
        }.bind(this));
    }

    a() {
        var contentDocument = $('html').html();
        console.log(1, contentDocument);
        // console.log(2,$('<CKEditor><CKEditor/>'));
        // console.log(2,$('<CKEditor><CKEditor/>').html());
        this.convertImagesToBase64(contentDocument);
        // var content = '<!DOCTYPE html>' + contentDocument.documentElement.innerHTML;
        let html = contentDocument;
        console.log('html', html);
        // var orientation = document.querySelector('.page-orientation input:checked').value;
        var converted = htmlDocx.asBlob(html);
        filesaver.saveAs(converted, 'test.docx', {type: 'utf-8'});
    }

    convertImagesToBase64(contentDocument) {

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

    render() {
        let a;
        if (this.state.value) {
            a = this.state.value
        }
        return (
            <Editor editorState={a} onChange={this.onChange}/>
        );
    }
}

export default SectionIndex;


/*<button onClick={this.a.bind(this)}>Convert</button>
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