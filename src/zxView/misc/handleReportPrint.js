import filesaver from 'file-saver';
import htmlDocx from 'html-docx-js';

function handleReportPrint(html) {
    let srt='';
    for(let i=0;i<html.length;i++){
        srt+=html[i];
    }
    html = `<!DOCTYPE html><html>${srt}</html>`;
    let converted = htmlDocx.asBlob(html, {orientation: 'portrait'});
    filesaver.saveAs(converted, 'report.docx');
}
export default handleReportPrint;
