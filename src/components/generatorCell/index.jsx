import React from "react";
import Cell from "../cell";
import "./styles.css"


const GeneratorCell = (props) => {
    const {field, action} = props;
    return (
        <div className="GeneratorCell">
            {
                props.field.map( (line, x) => ( 
                    <div className="Container" key={`line_${x}`}>
                        {
                            line.map((cell, y) => (
                                <Cell x={x} y={y} field={field} action={action} key={`cell_${x}_${y}`}/>
                            ))
                        }
                    </div>
                ))
            }     
        </div>
    );
};

export default GeneratorCell;