import "./App.css"
import MineField from "./components/minefield"

const actionCell = (x, y) => {
  console.log(x, y);
}

const App = function () {
  return (
    <div className="App">
      <MineField dim={8} actionCell={actionCell}/>
    </div>
  );
}

export default App;
