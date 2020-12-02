import "./App.css"
import Head from "./components/head";
import MineField from "./components/minefield"

const actionCell = (x, y) => {
  console.log(x, y);
}

const App = function () {
  return (
    <div className="App">
      <Head/>
      <MineField dim={8} numBombs={10} actionCell={actionCell}/>
    </div>
  );
}

export default App;
