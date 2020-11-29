
//Gera um número aleatorio de 0 a max-1
const randomInt = max => Math.floor(Math.random() * max);

//Cria uma matriz nxm
const  newMatriz = (n, m, valueDefault = 0) => {
    let matriz = new Array(n);
    for(let i = 0; i < n; i++){
        matriz[i] = new Array(m);
        for(let j = 0; j < m; j++){
            matriz[i][j] = valueDefault;
        }
    }
    return matriz;
};

//Calcula o numéro de bombas em volta
const calcNumberOfPumpsNearby = (field, x, y) => {
    const n = field.length;
    const m = field[0].length;

    const iStart = (x - 1 < 0) ? 0 : x - 1;
    const iEnd = (x + 2 > n) ? n : x + 2;
    const jStart = (y - 1 < 0) ? 0 : y - 1;
    const jEnd = (y + 2 > m) ? m : y + 2;

    let counter = 0;
    for (let i = iStart; i < iEnd; i++) {
        for (let j = jStart; j < jEnd; j++) {
            if (field[i][j] === true && i !== j) {
                counter++;
            }
        }
    }
    return counter;
}

export {randomInt, newMatriz, calcNumberOfPumpsNearby };