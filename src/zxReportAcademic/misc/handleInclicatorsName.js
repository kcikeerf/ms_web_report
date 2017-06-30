function handleInclicatorsName(sum,arr) {
    if (arr.length >= sum) {
        // 处理指标名字过长
        for (let i = 0; i < arr.length; i++) {
            let c_arr;
            let labelInterval;
            arr[i] = arr[i].replace(/(\r\n|\n|\r)/gm, '');
            c_arr = arr[i].split('');
            labelInterval = (c_arr.length > 10) ? 2 : 1;
            for (let j = 0; j < c_arr.length; j++) {
                if (labelInterval === 1) {
                    if (c_arr[j] === '（' || c_arr[j] === '(') {
                        c_arr[j] = '︵';
                    } else if (c_arr[j] === '）' || c_arr[j] === ')') {
                        c_arr[j] = '︶';
                    }
                }
                if ((j + 1) % labelInterval === 0) {
                    c_arr[j] += '\n';
                }
            }
            arr[i] = c_arr.join('');
        }
        return arr;
    } else {
        return arr;
    }
}
export default handleInclicatorsName;
