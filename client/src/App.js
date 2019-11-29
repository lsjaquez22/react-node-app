import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    axios.get("/api/customers").then(response => {
      setUser(response.data);
    });
  }, []);

  function addCostumer() {
    console.log("hola desde otra funcion");
    axios.post("/api/customers", {
      name: "Flavio"
    });
  }

  return (
    user && (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            {user.map(customer => (
              <li key={customer.id}>{customer.nombre}</li>
            ))}
          </ul>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={addCostumer}>Activate Lasers</button>
        </header>
      </div>
    )
  );
}

export default App;
