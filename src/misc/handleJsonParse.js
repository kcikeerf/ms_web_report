export default function handleJsonParse(res) {
    if(typeof res == 'string'){
        return JSON.parse(res);
    }else {
        return res;
    }
}