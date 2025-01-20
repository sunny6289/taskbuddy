import { useState } from "react";
import HomePage from "./pages/Home.page";
import LoginPage from "./pages/Login.page";


const App = () => {
  const [login, setLogin] = useState(false); // Will be removed after adding Firebase auth
  return (
    <div className="min-h-screen">
      {
        login ? <HomePage/> : <LoginPage setLogin={setLogin}/>
      }
    </div>
  );
}

export default App;
