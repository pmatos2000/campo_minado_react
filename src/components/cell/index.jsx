import React, { useState } from "react"
import "./styles.css"


const TypesCell = {
    EMPTY: 0,
    BOMB: 1,
};


const Cell = (props => {
    //Variavel que salva se a cell já foi presionada
    const [pressed, setPressed] = useState(false);

    const execAction = () => {
        setPressed(true);
        props.action(props.x, props.y);
    }

    if (pressed) {
        if (props.type === TypesCell.BOMB) {
            return (<div className="Cell Cell--press_bomb" />);
        }
        else if (props.numberOfPumpsNearby > 0) {
            const _className = `Cell Cell--press_empty_${props.numberOfPumpsNearby}`;
            return (<div className={_className}>{ props.numberOfPumpsNearby }</div>);
        }
        else{
            return (<div className="Cell Cell--press_empty"/>)
        }
    }
    else {
        return <div className="Cell Cell--normal" onClick={execAction}></div>
    }
});

export default React.memo(Cell);
export { TypesCell };