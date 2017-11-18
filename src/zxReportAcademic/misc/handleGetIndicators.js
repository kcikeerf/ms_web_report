//处理指标的方法
export default function handleGetIndicators(dimension, data) {
    let obj = {
        lvOne: null,
        lvTwo: null
    };
    let indicators = data.ckps[dimension].lv_n;
    let lvOne = [], lvTwo = [];
    for (let i = 0; i < indicators.length; i++) {
        let lv1 = indicators[i][Object.keys(indicators[i])[0]];
        //把一级指标的ID加入报告的里面
        lv1.ckp_uid = Object.keys(indicators[i])[0];
        lvOne.push(lv1);
        let insicatorTwo = lv1.items;
        for (let j = 0; j < insicatorTwo.length; j++) {
            let lv2 = insicatorTwo[j][Object.keys(insicatorTwo[j])[0]];
            //把一级指标的ID加入报告的里面
            lv2.ckp_uid = Object.keys(insicatorTwo[j])[0];
            lvTwo.push(lv2);
        }
    }
    obj.lvOne = lvOne;
    obj.lvTwo = lvTwo;

    return obj;
}