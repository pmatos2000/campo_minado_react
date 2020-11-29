import React, { useState } from "react"
import { ActionType } from "../../util/enum";
import { calcNumberOfPumpsNearby } from "../../util/util"
import "./styles.css"





const Cell = (props => {

    const { revealed } = props;

    //Variavel que salva o número de bombas em voltas 
    const [numberOfPumpsNearby, setNumberOfPumpsNearby] = useState(-1);

    const { field, x, y, action } = props;

    const temBomb = (field[x][y] === true); //Têm bomba

    const execAction = () => {
        if (temBomb) {  
            action(ActionType.EXE_BOMB);
        }
        else {
            setNumberOfPumpsNearby(calcNumberOfPumpsNearby(field, x, y));
            action(ActionType.TO_REVEAL, { x, y });
        }
    }

    if (revealed) {
        if (temBomb) {
            return (<div className="Cell Cell--press_bomb" />);
        }
        else {
            if(numberOfPumpsNearby === -1){ //Calcula o numero de bomba
                setNumberOfPumpsNearby(calcNumberOfPumpsNearby(field, x, y));
            }
            if (numberOfPumpsNearby > 0) {
                const _className = `Cell Cell--press_empty_${numberOfPumpsNearby}`;
                return (<div className={_className}>{numberOfPumpsNearby}</div>);
            }
            else {
                return (<div className="Cell Cell--press_empty" />)
            }
        }

    }
    else {
        return <div className="Cell Cell--normal" onClick={execAction}></div>
    }
});

export default Cell;