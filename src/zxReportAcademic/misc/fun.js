import $ from 'jquery';
import domtoimage from 'dom-to-image';
let filesaver = require('filesaver.js/FileSaver.min.js');
let htmlDocx = require('html-docx-js/dist/html-docx.js');

function fun(html) {
    let $html=$('html');
    a($('.my-node')[0]);
    html = convertImageToBase64($html);
    html = convertCanvasToBase64(html);
    html = $('html').html();
    let converted = htmlDocx.asBlob(html, {orientation: 'landscape', margins: {top: 720}});
    filesaver.saveAs(converted, 'report.docx');
}

export default fun;

function convertImageToBase64(contentDocument) {
    let regularImage = contentDocument.find('img');
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    [].forEach.call(regularImage, function (imgElement) {
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

function convertCanvasToBase64(contentDocument) {
    let regularCanvas = contentDocument.find('canvas');
    [].forEach.call(regularCanvas, function (canvasElement) {
        let img = new Image();
        img.src = canvasElement.toDataURL();
        canvasElement.replaceWith(img);
    });

    return contentDocument;
}

function a(node){
    // var node = document.getElementById('my-node');
    // var node = $('.my-node')[0];

    domtoimage.toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            document.body.appendChild(img);
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
}