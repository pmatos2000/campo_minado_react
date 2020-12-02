import Button from '@material-ui/core/Button';



import "./styles.css"

const Head = props => {
    return (
        <div className="Head">
            <div className="Menu">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={() => console.log("teste")}>
                    Menu
                </Button>
            </div>
            <div className="Title">Campo Minado</div>
            <div>...</div>
        </div>
    );
}

export default Head;