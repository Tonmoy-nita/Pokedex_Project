import { useState } from "react";
import "./App.css";
import CustomRoutes from "./routes/Customroutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CustomRoutes />
    </>
  );
}

export default App;
