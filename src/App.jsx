import { useEffect, useState } from "react";
import Login from "./pages/Login.jsx";
import Products from "./pages/products";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("access_token")),
  );

  useEffect(() => {
    const handleAuthExpired = () => {
      setIsLoggedIn(false);
    };

    window.addEventListener("auth-expired", handleAuthExpired);

    return () => {
      window.removeEventListener("auth-expired", handleAuthExpired);
    };
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return <Products onLogout={() => setIsLoggedIn(false)} />;
}

export default App;
