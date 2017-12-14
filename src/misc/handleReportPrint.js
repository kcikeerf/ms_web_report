let filesaver = require('filesaver.js/FileSaver.min.js');
let htmlDocx = require('html-docx-js/dist/html-docx.js');

function handleReportPrint(html) {
    let srt='';
    for(let i=0;i<html.length;i++){
        srt+=html[i];
    }
    html = `<!DOCTYPE html>
            <html>
            <meta charset="utf-8">
                ${srt}
            </html>
            `;
    let converted = htmlDocx.asBlob(html, {orientation: 'portrait'});
    filesaver.saveAs(converted, '甄学错题本.docx');
}

export default handleReportPrint;
