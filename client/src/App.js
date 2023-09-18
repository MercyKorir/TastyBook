import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import UserProfile from "./components/UserProfile";
import AuthWrapper from "./components/AuthWrapper";

function App() {
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
      </Routes>
    </div>
  );
}

export default App;
