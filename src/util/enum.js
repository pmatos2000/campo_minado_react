export const ActionType =  {
    EXE_BOMB: 1, //Executa a bomba
    OPEN_NEIGHBORS: 2,  //Abre os vizinho
};

export const  newMatriz = (n, m, valueDefault = 0) => {
    let matriz = new Array(n);
    for(let i = 0; i < n; i++){
        matriz[i] = new Array(m);
        for(let j = 0; j < m; j++){
            matriz[i][j] = valueDefault;
        }
    }
}