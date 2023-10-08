import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import UserProfile from "./components/UserProfile";
import AuthWrapper from "./components/AuthWrapper";
import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import RecipeForm from "./components/RecipeForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AllRecipes from './components/AllRecipes'
import Recipe from "./components/Recipe";
import Meal from "./components/Meal";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", paddingTop: "100px" }}
    >
      <Header />
      <Routes>
        <Route
          path="/login"
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
        <Route path="/" element={<Home />} />
        <Route path="/recipe/create" element={<RecipeForm />} />
        <Route path="/recipes" element={<AllRecipes />} />
        <Route path="/user" element={<UserProfile />} />
        <Route
          path="/forgot-password"
          element={
            <AuthWrapper>
              <ForgotPassword />
            </AuthWrapper>
          }
        />
        <Route
          path="/reset-password"
          element={
            <AuthWrapper>
              <ResetPassword />
            </AuthWrapper>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Meal />} />
        <Route exact path="/:recipeId" element={<Recipe />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
