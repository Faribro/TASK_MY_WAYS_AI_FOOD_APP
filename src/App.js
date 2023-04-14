import React, { useState } from "react";
import CreateFood from "./Form";
import FoodList from "./List";
import "./index.css";

function App() {
  const [page, setPage] = useState("create");

  return (
    <div className="App">
      <nav className="navigation">
        <button onClick={() => setPage("create")}>Create Food</button>
        <button onClick={() => setPage("list")}>Food List</button>
      </nav>
      {page === "create" && <CreateFood />}
      {page === "list" && <FoodList />}
    </div>
  );
}

export default App;
