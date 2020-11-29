import React, { useState, useEffect } from "react";
import { ActionType, CellType } from "../../util/enum";
import GeneratorCell from "../generatorCell";

import "./styles.css";

import { randomInt, newMatriz, calcNumberOfPumpsNearby } from "../../util/util";



const MineField = (props) => {

    const { dim, numBombs } = props;

    // Função que para gerar um Field valido
    const genField = (x0 = 0, y0 = 0) => {

        //Cria uma matriz
        let field = newMatriz(dim, dim, CellType.NO_BOMB);
        console.log(field)

        //Preenche o campo com bombas
        for (let i = 0; i < numBombs; i++) {
            let x, y;
            do {
                x = randomInt(dim);
                y = randomInt(dim);
            } while (field[x][y] === CellType.IS_BOMB || (x === x0 && y === y0));
            field[x][y] = CellType.IS_BOMB;
        }

        //Calcula o número de bombas em volta
        for (let i = 0; i < dim; i++) {
            for (let j = 0; j < dim; j++) {
                if (field[i][j] === CellType.NO_BOMB) {
                    field[i][j] = calcNumberOfPumpsNearby(field, i, j);
                }
            }
        }

        return field;
    }



    //Salva a dimensão do campo minado
    const [field, setField] = useState(newMatriz(dim, dim, 0))

    //Salva os campos que já foram revelados
    const [revealeds, setRevealeds] = useState(newMatriz(dim, dim, false));

    //Flag usado para saber se é o primeiro clique
    let [firstClick, setFirstClick] = useState(true);

    //Função para verificar se o jogo foi vencido
    const victory = () => {
        debugger;
        for(let i = 0; i < dim; i++){
            for(let j = 0; j < dim; j++){
                //Verifica se todas as celulas que não foram reveladas
                //não são bombas
                if(revealeds[i][j] === false && field[i][j] !== CellType.IS_BOMB){
                    return false;
                }
            }
        }
        return true;
    }
    

    //Função para revelar exibir o valor do botão e dos vizinhos
    const toReveal = (x, y, _field = field) => {

        const reveal = [];

        //Função que realiza busca em profundidade
        const BFS = () => {
            let row = [];
            row.push({ x, y });

            //Verifica se é uma posição valida
            const isValidPos = (x, y) =>(
                x >= 0 &&
                y >= 0 &&
                x < dim &&
                y < dim
            );

            //Verifica se têm que visitar os outros vizinhos
            const checkNeighbors = (x, y) => (
                _field[x][y] !== CellType.IS_BOMB //Não é uma bomba
                && row.findIndex(value => value.x === x && value.y === y) === -1 //Não ésta na fila
                && reveal.findIndex(value => value.x === x && value.y === y) === -1
            );

            while (row.length > 0) {
                let pop = row.pop();
                reveal.push(pop); //Coordenadas que serão reveladas

                //Só visita os outros filhos se nessa casa tiver 0 bombas em volta
                if (_field[pop.x][pop.y] > 0) continue;

                let neighbors = [ {x: pop.x + 1, y: pop.y},
                                    {x: pop.x - 1, y: pop.y},
                                    {x: pop.x, y: pop.y + 1},
                                    {x: pop.x, y: pop.y - 1} ];
                neighbors = neighbors.filter(value => isValidPos(value.x, value.y));
                neighbors = neighbors.filter(value => checkNeighbors(value.x, value.y));
                if(neighbors.length > 0)  row = row.concat(neighbors);
            }
        }

        //Executa o BFS
        BFS();

        //Atualiza os campos revelados
        const newRevealeds = newMatriz(dim, dim, false);
        for (let i = 0; i < dim; i++) {
            for (let j = 0; j < dim; j++) {
                newRevealeds[i][j] = revealeds[i][j] || (reveal.findIndex(value => value.x === i && value.y === j) !== -1);
            }
        }
        newRevealeds[x][y] = true;
        setRevealeds(newRevealeds);
    }

    //Revela todas as bombas
    const toRevealBombs = () => {
        const newRevealeds = newMatriz(dim, dim, false);
        for (let i = 0; i < dim; i++) {
            for (let j = 0; j < dim; j++) {
                newRevealeds[i][j] = revealeds[i][j] || field[i][j] === CellType.IS_BOMB;
            }
        }
        setRevealeds(newRevealeds);
    }

    //Função passada para todas as celulas para executar uma ação a ser clicado
    const actionCell = (actionType, data) => {
        switch (actionType) {
            case ActionType.TO_REVEAL:
                if (firstClick) {
                    const newField = genField(data.x, data.y);
                    toReveal(data.x, data.y, newField);
                    setFirstClick(false);
                    setField(newField);

                }
                else {
                    toReveal(data.x, data.y);
                }
                break;
            case ActionType.EXE_BOMB:
                toRevealBombs();
                alert("Você perdeu");
                break;
            default:
                console.log(actionType);
                break;

        }
    }

    useEffect(() => {
        if(victory()){
            alert("Você venceu!!!");
        }
    });

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