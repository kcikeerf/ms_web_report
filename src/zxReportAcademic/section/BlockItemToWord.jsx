import React from 'react';
import $ from 'jquery';
//import html2canvas from 'html2canvas';
//import htmlDocx from 'html-docx-js';
import domtoimage from 'dom-to-image';
//download的svg
import download from 'zx-img/download.svg';
//输出word使用的module
let filesaver = require('filesaver.js/FileSaver.min.js');
let htmlDocx = require('html-docx-js/dist/html-docx.js');

class BlockItemToWord extends React.Component {
    constructor(props) {
        super(props);
        // this.outPut = this.outPut.bind(this);
        this.state = {
            flag: 0,
            canvasArray: [],
            imgArray: []
        }
    }

    componentDidMount() {
    }

    //catchBlock-htmlToImgFun->抓取图片
    catchBlock() {
        if ($('.testing1')) {
            let node = $('.testing1');
            console.log(node);
            console.log(node[0]);
            console.log(node[1]);
            for (let i = 0; i < node.length; i++) {
                this.htmlToImgFun(node[i])
            }
        } else {
            return
        }
    }

    htmlToImgFun(node) {
        domtoimage.toPng(node)
            .then(function (dataUrl) {
                let img = new Image();
                img.src = dataUrl;
                let $node = $(`#${node.id}`);
                $node.children().remove();
                $node.css('paddingLeft', 0).css('paddingTop', 0).css('paddingBottom', 0).css('display', 'block');
                $node[0].appendChild(img);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }

    //弹出窗口函数
    pop(obj) {
        function tanchuang(obj) {
            $('body').append('<div id="mry-opo"><div id="mry-opo-title"></div><div id="mry-opo-content"></div></div>');
            let div = $('#mry-opo');
            $('#mry-opo-title').text(obj.title);
            $('#mry-opo-content').text(obj.content);
            div.css('width', obj.width + 'px');
            div.css('height', obj.height + 'px');
            div.css('margin-left', -(parseInt(obj.width) / 2) + 'px');
            div.css('margin-top', -(parseInt(obj.height) / 2) + 'px');
            div.css('background', obj.backgorund);
            $('#mry-mask').css('display', 'block');
        }

        function del() {
            $('#mry-opo').append('<a href="javascript:void(0)" deletes="mry-opo" style="position:absolute;right:10px;top:6px;color:#fff;font-size:12px;">X</a>');
            $('[deletes=mry-opo]').click(function () {
                $('#mry-opo,#mry-mask').remove();
            });
        }

        setTimeout(function () {
            $('#mry-opo').append('<a href="javascript:void(0)" deletes="mry-opo" style="position:absolute;right:10px;top:6px;color:#fff;font-size:12px;">X</a>');
            $('#mry-opo,#mry-mask').remove();
        }, obj.autoCloseTime);

        $('body').append('<div id="mry-mask" deletes="mry-opo"></div>');
        let ject = obj;
        ject.width = parseInt(obj.width) || 300;
        ject.height = parseInt(obj.height) || 300;
        ject.title = obj.title || '来自提示信息';
        ject.content = obj.content || '这是一个提示信息';
        ject.backgorund = obj.backgorund || '#fff';
        tanchuang(ject);
        del();
    }

    //调用弹出层
    popUp() {
        this.pop({
            width: 500,             //提示窗口的宽度
            height: 200,            //提示窗口的高度
            title: '正在下载',       //提示窗口的标题
            content: '请稍后...',    //提示窗口的内容
            autoCloseTime: 2000,    //提示窗口自动关闭时间
        })
    }



    //输出word函数
    outPut(event) {
        //this.popUp();
        let $html = $('html');
        // let $html = $('.testing');
        // let nowWidth = $html.width();
        // $('body').css('width', '940');
        //抓取块转成图片
        this.catchBlock();
        let that = this;
        //let canvas = document.querySelector('canvas');
        // html2canvas(document.querySelector('#test1'), {
        //
        //         onrendered: function (canvas) {
        //             document.querySelector('#test11').appendChild(canvas);
        //             $('#test1').remove();
        //             console.log(1);
        //             console.log(document.querySelector('#test11'));
        //         },
        //         width: 750,
        //         height: 400
        //     }
        // );
        //
        setTimeout(function () {
            //筛选不打印的 className带有nonprinting
            let reg = /nonprinting/;
            let regularImage = $html.find('img');
            let nonprinting = $html.find('.nonprinting');
            nonprinting.map(function (index, item) {
                if (reg.test(item.className) === true) {
                    $(item).css('display', 'none')
                }
            });
            //img转base64函数执行一次
            if (that.state.flag === 0) {
                html = that.convertImageToBase64($html);
            }
            html = that.convertCanvasToBase64($html);
            let html = $html.html();
            let converted = htmlDocx.asBlob(html);
            filesaver.saveAs(converted, 'report.docx');
            //在输出word之后，将html中的图片替换为canvas
            // $('body').css('width', nowWidth);
            for (let i = 0; i < that.state.imgArray.length; i++) {
                that.state.imgArray[i].replaceWith(that.state.canvasArray[i]);
            }
            //window.location.reload();
            //html=that.Fun($html);
            $('.nonprinting').css('display', 'block');
        }, 1000);
    }

    //img转成base64
    convertImageToBase64(contentDocument) {
        this.setState({
            flag: 1
        });
        let regularImage = contentDocument.find('img');
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        [].forEach.call(regularImage, function (imgElement) {
            if (imgElement.id === 'noprinting') {
                $(imgElement).parent().css('display', 'none')
            }
            // preparing canvas for drawing
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            ctx.drawImage(imgElement, 0, 0);
            // by default toDataURL() produces png image, but you can also export to jpeg
            // checkout function's documentation for more details
            let dataURL = canvas.toDataURL();
            imgElement.setAttribute('src', dataURL);
        });
        canvas.remove();
        return contentDocument;
    }

    //canvas转成base64
    convertCanvasToBase64(contentDocument) {
        let canvasArray = [], imgArray = [];
        let regularCanvas = contentDocument.find('canvas');
        // [].forEach.call(regularCanvas, function (canvasElement,index) {
        //     array.push(canvasElement);
        //     let img = new Image();
        //     img.src = canvasElement.toDataURL();
        //     canvasElement.replaceWith(img);
        //
        // });

        [].forEach.call(regularCanvas, function (canvasElement) {
            canvasArray.push(canvasElement);
        });
        canvasArray.forEach(function (key, index, items) {
            if (/control/.test(($(key).parent().parent())[0].className) === true) {
                let img = new Image(400, 400);
                img.src = key.toDataURL();
                $(key).parent().css('textAlign', 'center');
                key.replaceWith(img);
                imgArray.push(img)
            } else {
                let img = new Image((key.width), (key.height));
                img.src = key.toDataURL();
                key.replaceWith(img);
                imgArray.push(img)
            }

        });
        this.setState({
            canvasArray,
            imgArray,
        });
        return contentDocument;
    }

    Fun(contentDocument) {
        let regularImage = contentDocument.find('img');
        //console.log(regularImage);
        for (let i = 0; i < regularImage.length; i++) {
            this.convertImageToCanvas(regularImage[i])
        }
        return contentDocument
    }

    componentWillUnmount() {
    }

    render() {
        let style = {
            // width:'40px',
            height: '50px',
            position: 'fixed',
            right: '5%',
            bottom: '85%',
            color: '#999',
            fontSize: '12px',
            opacity: '0.8',
            textAlign: 'center',
            lineHeight: '40px',
        };

        let downloadStyle = {
            position: 'absolute',
            left: '0px',
            top: '37px',
            width: '52px',
            zIndex:100
        };

        return (
            <div className='toWord' style={style} onClick={this.outPut.bind(this)}
                 // ref={(el) => {this.output = el}}
            >

                <div className="nonprinting">
                    <img alt="" src={download}/>
                    <div style={downloadStyle}>下载报告</div>
                </div>
            </div>
        )
    }
}
export default BlockItemToWord;