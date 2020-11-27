import React, { useState } from "react"
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



const Cell = (props => {
    //Variavel que salva se a cell já foi presionada
    const [pressed, setPressed] = useState(false);
    
    //Variavel que salva o número de bombas em voltas 
    const [numberOfPumpsNearby, setNumberOfPumpsNearby] = useState(0);

    const{field, x, y} = props;

    const temBomb = (field[x][y] === true); //Têm bomba

    const execAction = () => {
        setPressed(true);
        if(temBomb){ 
            props.action(x, y);
        }
        else{
            setNumberOfPumpsNearby(calcNumberOfPumpsNearby(field, x, y));
            props.action(props.x, props.y);
        }
        
    }

    if (pressed) {
        if (temBomb) {
            return (<div className="Cell Cell--press_bomb" />);
        }
        else if (numberOfPumpsNearby > 0) {
            const _className = `Cell Cell--press_empty_${numberOfPumpsNearby}`;
            return (<div className={_className}>{ numberOfPumpsNearby }</div>);
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