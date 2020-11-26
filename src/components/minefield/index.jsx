import React, { useState } from "react";
import GeneratorCell from "../generatorCell";

import "./styles.css";

const randomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const genField = (dim, numBombs) => {
    let field;

    //Cria uma matriz
    field = new Array(dim);
    for(let i = 0; i < dim; i++){
        field[i] = new Array(dim);
        for(let j = 0; j < dim; j++){
            field[i][j] = false; //Inicia todos os valores como falso
        }
    }

    //Preenche o campo com bombas
    for(let i = 0; i < numBombs; i++){;
        let x, y;
        do{
            x = randomInt(dim);
            y = randomInt(dim);
        } while(field[x][y] === true);
        field[x][y] = true;
    }

    return field;
}



const MineField = (props) => {
    //Salva a dimensão do campo minado
    const [field, setField] = useState(genField(props.dim, props.dim))
    console.log(field);

    return(
        <div className="MineFiel">
            <GeneratorCell field={field} actionCell={props.actionCell} />
        </div>
    );

};

export default MineField;