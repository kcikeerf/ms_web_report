export default function handleNoteDiff(data) {
    let selfValue = data.selfValue;
    let value = selfValue.value;
    let label = selfValue.label;
    if(value>30){
        return `该${label}分化度高于30，分化度较为明显，学生均衡性较低`;
    }else if(value>=20){
        return `该${label}分化度介于20~30之间，分化度略明显，学生均衡性一般`;
    }else {
        return `该${label}分化度低于20，分化度较低，学生均衡性较好`;
    }
}