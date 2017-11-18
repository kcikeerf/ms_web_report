export default function handleNoteChildBasic(data,label) {
    let modifiedData = [];
    let basicData = data;

    basicData.sort(function (x, y) {
        let val1 = Number(x[2]);
        let val2 = Number(y[2]);
        return val2-val1 ;
    });

    modifiedData.push(`在所有${label}中平均分最高的${label}是:${basicData[0][0]}`);

    basicData.sort(function (x, y) {
        let val1 = Number(x[3]);
        let val2 = Number(y[3]);
        return val1-val2;
    });


    modifiedData.push(`在所有${label}中分化度最小的${label}是:${basicData[0][0]}`);

    return modifiedData;
}