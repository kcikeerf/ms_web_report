function handleFloatNumb(rawData, decimal=null) {
    if (decimal == null || isNaN(decimal)) {
        decimal = 0;
    }

    let numb;
    if (rawData) {
        if(!('' + rawData).includes('e')) {
            return +(Math.round(rawData + 'e+' + decimal)  + 'e-' + decimal);
        } else {
            let arr = ('' + rawData).split('e');
            let sig = '';
            if(+arr[1] + decimal > 0) {
                sig = '+';
            }
            return +(Math.round(+arr[0] + 'e' + sig + (+arr[1] + decimal)) + 'e-' + decimal);
        }
    }
    else if (rawData === 0) {
        numb = 0;
    }
    else {
        numb = null;
    }

    return numb;
}

export default handleFloatNumb;