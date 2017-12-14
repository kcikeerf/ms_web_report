import $ from 'jquery';
export default function handleToggleMenu() {
    let $zxMargin = $(".zx-iconbar");
    let $width = $zxMargin.css('width');
    let $sideNav = $('.side-nav');
    let transform = $sideNav.css('transform').split(/[()]/)[1];
    let translateX = transform.split(',')[4].trim();
    let $collapsibleBody = $('.collapsible-body');
    let $zxIconbarTool = $(".zx-icon-bar-tool");
    let $zxMain = $('.zx-main');
    if ($width === "56px") {
        $zxMargin.css('width', '200px');
        $zxMain.css('margin-left', '200px');
        if (translateX === '56') {
            $sideNav.addClass('zx-collapse');
            $sideNav.css('transform', 'translateX(-125%)');
            $collapsibleBody.css('transform', 'translateX(-125%)');
            $zxMain.css('margin-left', '200px');
            if ($(window).width() > 1230) {
                // $zxMain.css('margin-left', '60px');
            }
            else {
                // $zxMain.css('margin-left', '0px');
            }
        }
        $zxIconbarTool.css('transform', 'translateX(-110px)');
    }
    else if ($width === "200px") {
        $zxMargin.css('width', '56px');
        if (translateX === '200') {
            $sideNav.addClass('zx-collapse');
            $sideNav.css('transform', 'translateX(-125%)');
            $collapsibleBody.css('transform', 'translateX(-125%)');
            $zxIconbarTool.css('transform', 'translateX(-110px)');
        }
        $zxIconbarTool.css('transform', 'translateX(-110px)');
        $zxMain.css('margin-left', '55px');
    }
}