export default function handleNoteScore(data) {
    let modifiedData = [];
    let fullValue = data.fullValue;
    let selfValue = data.selfValue;
    let parentValues = data.parentValues;

    let label = selfValue.label;
    let value = selfValue.value;
    let score = handleScore(fullValue,value);
    let note = `${label}平均得分 ${score}`;
    modifiedData.push(note);
    if(parentValues.length > 0){
        let otherValue,otherLabel,compare,note1;
        for(let i=0;i<parentValues.length;i++){
            otherValue = parentValues[i].value;
            otherLabel = parentValues[i].label;
            compare = handleScoreCompare(value,otherValue,otherLabel);
            note1 = `${compare[0]}平均得分，${compare[1]}`;
            modifiedData.push(note1);
        }
    }

    return modifiedData;
}

function handleScore(fullValue,value) {
    let valuePerent = parseFloat((value/fullValue)*100).toFixed(2);
    if(valuePerent>=85){
        return '优秀';
    }else if(valuePerent>=70){
        return '良好';
    }else if(valuePerent>=60){
        return '及格';
    }else {
        return '不及格';
    }
}

function handleScoreCompare(mainValue,otherValue,lable) {
    if(mainValue>otherValue){
        return [`高于${lable}`,`在${lable}中表现有优势`];
    }else if(mainValue === otherValue){
        return [`高于${lable}`];
    }else if(mainValue<otherValue){
        return [`高于${lable}`,`在${lable}中还需要提高`];
    }
}