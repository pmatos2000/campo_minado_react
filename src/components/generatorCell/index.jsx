import React from "react";
import Cell from "../cell";
import "./styles.css"


const GeneratorCell = (props) => {
    const { field, action, revealeds } = props;

    const cellMap = (cell, x, y) => (
        <Cell
            x={x}
            y={y}
            field={field}
            action={action}
            revealed={revealeds[x][y]}
            key={`cell_${x}_${y}`}
        />
    );

    const lineMap = (line, x) => (
        <div className="Container" key={`line_${x}`}>
            { line.map((cell, y) => cellMap(cell, x, y)) }
        </div>
    );

    return (
        <div className="GeneratorCell">
            { field.map (lineMap) }
        </div>
    );
};

export default GeneratorCell;