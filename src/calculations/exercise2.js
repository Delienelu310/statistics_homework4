
function generateXn(){
    return Math.random() > 0.5 ? 1 : -1;
}

function generateSn(n){
    let sum = 0;
    for(let i = 0; i < n; i++){
        sum += generateXn();
    }
    return sum;
}


export function generateSnDistribution(n, repeats){
    let result = {};

    for(let i = 0; i < repeats; i++){
        let sn = generateSn(n);
        if(!result[sn]){
            result[sn] = 1;
        }else{
            result[sn]++;
        }
    }

    for(let key of Object.keys(result)){
        result[key] = result[key] / repeats;
    }

    return result;
}

function generateNormalPx(n, a, b){
    return (1 / Math.sqrt(2 * Math.PI)) / a * Math.pow(Math.E, -( Math.pow(n - b, 2) / 2 / Math.pow(a, 2)) );
}

export function generateNormalDistribution(n, a, b, k){
    let result = {};

    for(let i = -n; i <= n; i++){
        result[i] = k * generateNormalPx(i, a, b);
    }

    return result;
}