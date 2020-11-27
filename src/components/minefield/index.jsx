import React, { useState } from "react";
import { ActionType, newMatriz } from "../../util/enum";
import GeneratorCell from "../generatorCell";

import "./styles.css";

const randomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const genField = (dim, numBombs, x0 = 0, y0 = 0) => {
    let field;

    //Cria uma matriz
    field = newMatriz(dim, dim, false);

    //Preenche o campo com bombas
    for(let i = 0; i < numBombs; i++){;
        let x, y;
        do{
            x = randomInt(dim);
            y = randomInt(dim);
        } while(field[x][y] === true || x === x0 || y === y0);
        field[x][y] = true;
    }

    return field;
}


const updateForceView = (forceView, field, x, y) => {
    //Realiza uma busca em largura
    
}

const MineField = (props) => {

    const {dim} = props;

    //Salva a dimensão do campo minado
    const [field, setField] = useState(genField(dim, dim))
    const [forceView, setForceView] = useState(newMatriz(dim, dim, false));

    const actionCell = (actionType, data) => {
        switch(actionType){
            case ActionType.OPEN_NEIGHBORS:
                break;
        }
    }

    return(
        <div className="MineFiel">
            <GeneratorCell field={field} action={actionCell} />
        </div>
    );
};

export default MineField;