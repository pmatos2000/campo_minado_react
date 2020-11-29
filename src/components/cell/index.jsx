import React from "react"
import { ActionType, CellType } from "../../util/enum";
import "./styles.css"





const Cell = (props => {

    const { revealed, value, x, y, action } = props;

    const execAction = () => {
        if (value === CellType.IS_BOMB) {  
            action(ActionType.EXE_BOMB);
        }
        else {
            action(ActionType.TO_REVEAL, {x,y});
        }
    }

    if (revealed) {
        if (value === CellType.IS_BOMB) {
            return (<div className="Cell Cell--press_bomb" />);
        }
        else {
            const _className = `Cell Cell--press_empty_${value}`;
            return (<div className={_className}>{value}</div>);
        }

    }
    else {
        return <div className="Cell Cell--normal" onClick={execAction}></div>
    }
});

export default Cell;