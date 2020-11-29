export const ActionType =  {
    EXE_BOMB: 1, //Executa a bomba
    TO_REVEAL: 2, //Revela que não é uma bomba e exibe os vizinhos que tambem não são
};

export const CellType = {
    IS_BOMB: -1, //A celular é uma bomba
    NO_BOMB: 0, //A celular não é uma bomba
}