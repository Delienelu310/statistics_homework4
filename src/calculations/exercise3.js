
function generateXN(){
    return Math.random() > 0.5 ? 1 : -1;
}

function calculatePN(n){
    let sum = 0; 
    let ln = 0;
    for(let i = 0; i < n; i++){
        let x = generateXN();
        if(sum > 0 || sum + x > 0) ln++;
        sum += x;
    }

    return ln / n;
}

export function generatePnData(n, k){
    let result = {};
    for(let i = 0; i < k; i++){
        let pn = calculatePN(n);
        let 
            a = Math.floor(pn * 20);
        if(a == 20) a--;
        if(!result[a]) result[a] = 0;
        result[a]++;
    }

    for(let key of Object.keys(result)){
        result[key] /= k;
    }

    return result;
}

function arcsinDistribution(x){
    return 1 / Math.PI / Math.sqrt(x * (1 - x));
}

export function generateArcsinData(k){
    let result = [];
    
    for(let i = 1; i < 100; i++){
        result.push(k * arcsinDistribution(i / 100));
    }

    return result;
}
