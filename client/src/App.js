import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "./components/Header";
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import UserProfile from "./components/UserProfile";
import AuthWrapper from "./components/AuthWrapper";
import { useEffect } from "react";
import Recipe from './components/Recipe'
import Meal from './components/Meal'
function App() {
  const navigate = useNavigate();
  const [cookies, ,] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      navigate("/home");
    }
  }, [cookies.token, navigate]);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/" 
          element={
            <AuthWrapper>
              <Login />
            </AuthWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthWrapper>
              <SignupForm />
            </AuthWrapper>
          }
        />
        <Route path="/home" element={<UserProfile />} />
        <Route  path="/" element={<Meal/>}/>
      <Route exact path="/:recipeId" element={<Recipe/>}/>
      </Routes>
    </div>
  );
}

export default App;
