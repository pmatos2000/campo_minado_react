import React from "react";
import Cell, { TypesCell } from "../cell";
import "./styles.css"

const calcNumberOfPumpsNearby = (field, x, y) => {
    const n = field.length;
    const m = field[0].length;

    let iStart = x - 1;
    if (iStart < 0) iStart = 0;
    let jStart = y - 1;
    if (jStart < 0) jStart = 0;
    let iEnd = x + 2;
    if (iEnd > n) iEnd = n;
    let jEnd = y + 2;
    if (jEnd > m) jEnd = m;

    let counter = 0;
    for (let i = iStart; i < iEnd; i++) {
        for (let j = jStart; j < jEnd; j++) {
            if (field[i][j] === true) {
                counter++;
            }
        }
        
    }
    return counter;
}


const GeneratorCell = (props) => {
    console.log(props.field);
    return (
        <div>{
            props.field.map((line, i) => (
                <div className="Container" key={`line_${i}`}>{
                    line.map((bomb, j) => {
                        if (bomb === true) {
                            return (
                                <Cell
                                    key={`cell_${i}_${j}`}
                                    x={i}
                                    y={j}
                                    action={props.actionCell}
                                    type={TypesCell.BOMB}
                                />
                            );
                        }
                        else {
                            const numberOfPumpsNearby = calcNumberOfPumpsNearby(props.field, i, j);
                            return (
                                <Cell
                                    key={`cell_${i}_${j}`}
                                    x={i}
                                    y={j}
                                    action={props.actionCell}
                                    type={TypesCell.EMPYT}
                                    numberOfPumpsNearby={numberOfPumpsNearby}
                                />
                            );
                        }
                    })
                }</div>
            ))
        }</div>
    )
};

export default GeneratorCell;