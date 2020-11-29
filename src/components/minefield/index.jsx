import React, { useState } from "react";
import { ActionType } from "../../util/enum";
import GeneratorCell from "../generatorCell";

import "./styles.css";

import { randomInt, newMatriz, calcNumberOfPumpsNearby } from "../../util/util";



const MineField = (props) => {

    const { dim, numBombs } = props;

    // Função que para gerar um Field valido
    const genField = (x0 = 0, y0 = 0) => {

        //Cria uma matriz
        let field = newMatriz(dim, dim, false);

        //Preenche o campo com bombas
        for (let i = 0; i < numBombs; i++) {
            let x, y;
            do {
                x = randomInt(dim);
                y = randomInt(dim);
            } while (field[x][y] === true || (x === x0 && y === y0));
            field[x][y] = true;
        }
        return field;
    }



    //Salva a dimensão do campo minado
    const [field, setField] = useState(newMatriz(dim, dim, false))

    //Salva os campos que já foram revelados
    const [revealeds, setRevealeds] = useState(newMatriz(dim, dim, false));

    //Flag usado para saber se é o primeiro clique
    let [firstClick, setFirstClick] = useState(true);


    //Função para revelar exibir o valor do botão e dos vizinhos
    const toReveal = (x, y, _field=field) => {

        const reveal = [];

        //Função que realiza busca em profundidade
        const BFS = () => {
            const row = [];
            row.push({x,y});

            while (row.length > 0) {
                let pop = row.pop();
                reveal.push(pop); //Coordenadas que serão reveladas

                //Só visita os outros filhos se nessa casa tiver 0 bombas em volta
                let numNumberOfPumpsNearby = calcNumberOfPumpsNearby(_field, pop.x, pop.y);
                if(numNumberOfPumpsNearby > 0) continue; 


                let iStart = (pop.x - 1 < 0) ? 0 : pop.x - 1;
                let iEnd = (pop.x + 2 > dim) ? dim : pop.x + 2;
                let jStart = (pop.y - 1 < 0) ? 0 : pop.y - 1;
                let jEnd = (pop.y + 2 > dim) ? dim : pop.y + 2;


                for (let i = iStart; i < iEnd; i++) {
                    for (let j = jStart; j < jEnd; j++) {

                        if (
                            _field[i][j] === false //Não é uma bomba
                            && row.findIndex(value => value.x === i && value.y === j) === -1 //Não ésta na fila
                            && reveal.findIndex(value => value.x === i && value.y === j) === -1) {  //Não foi visitado ainda

                            row.push({ x: i, y: j });
                        }
                    }
                }
            }
        }

        BFS();
        console.log(reveal);

        const newRevealeds = newMatriz(dim, dim, false);

        for (let i = 0; i < dim; i++) {
            for (let j = 0; j < dim; j++) {
                newRevealeds[i][j] = revealeds[i][j] || (reveal.findIndex(value => value.x === i && value.y === j) !== -1);
            }
        }
        newRevealeds[x][y] = true;
        setRevealeds(newRevealeds);
        console.log(newRevealeds);
    }

    const toRevealBombs = () => {
        const newRevealeds = newMatriz(dim, dim, false);
        for (let i = 0; i < dim; i++) {
            for (let j = 0; j < dim; j++) {
                newRevealeds[i][j] = revealeds[i][j] || field[i][j];
            }
        }
        setRevealeds(newRevealeds);
    }


    const actionCell = (actionType, data) => {
        debugger;
        switch (actionType) {
            case ActionType.TO_REVEAL:
                if(firstClick){
                    const newField = genField(data.x,data.y);
                    toReveal(data.x, data.y, newField);
                    setFirstClick(false);
                    setField(newField);
                    
                }
                else{
                    toReveal(data.x, data.y);
                }
                break;
            case ActionType.EXE_BOMB:
                toRevealBombs();
                break;
            default:
                console.log(actionType);
                break;

        }
    }

    return (
        <div className="MineFiel">
            <GeneratorCell
                field={field}
                action={actionCell}
                revealeds={revealeds}
            />
        </div>
    );
};

export default MineField;