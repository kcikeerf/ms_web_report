import echarts from 'echarts';

function handleAllEchartsResize(reportList) {
    let echartsDoms = document.getElementsByClassName('echarts-for-echarts');
    for (let i in echartsDoms) {
        if (echarts.getInstanceByDom(echartsDoms[i])) {
            if (typeof echarts.getInstanceByDom(echartsDoms[i]).resize === "function") {
                echarts.getInstanceByDom(echartsDoms[i]).resize();
            }
        }
    }
}

export default handleAllEchartsResize;