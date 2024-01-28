
// calculate E(x) for Bin(n,p) X argument
export function calculateEX(n, p){
    return n * p;
}

// calculate Var(x) for Bin(n,p) X argument
export function calculateVARX(n, p){
    return (n * p * (1 - p));
}

export function calculatePX(n, k, p){

    let current = 1; 
    for(let i = 1; i <= k; i++){
        current *= p;
        current *= i;
        current /= i;
    }
    for(let i = 1; i <= n - k; i++){
        current *= (1 - p);
        current *= k + i;
        current /= i; 
    }

    return current;
}

export function calculateA(n, p){

    let sumP = 0;
    
    let ex = calculateEX(n, p);
    
    let passed = 0;
    for(let  i = Math.round(1.2 * ex); i <= n; i++){
        if(i / n < passed){
            console.log(`For n ${n}: ${Math.round(i / n * 100)}`);
            passed += 0.1;
        }
        let currentPX = calculatePX(n, i, p);
        sumP += currentPX;
    }

    return sumP;
}

export function calculateB(n, p ){
    let sumP = 0;
    
    let ex = calculateEX(n, p);
    

    //we divide in 2 parts by eliminating | |

    //1. x >= 1.1ex
    for(let  i = Math.round(1.1 * ex); i <= n; i++){
        sumP += calculatePX(n, i, p);
    }

    //2. x <= 0.9ex 
    for(let i = 0; i <= Math.round(0.9 * ex); i++){
        sumP += calculatePX(n, i, p);
    }

    return sumP;
}