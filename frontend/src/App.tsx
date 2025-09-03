import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CostEstimatorPage from "./pages/CostEstimatorPage";
import ProjectsPage from "./pages/ProjectsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavigationBar from "./pages/NavigationBar";
import authService from "./services/authService";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | undefined>("");

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setUsername(user.username);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <Router>
      <NavigationBar
        isAuthenticated={isAuthenticated}
        username={username}
        onLogout={handleLogout}
      />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/estimate" component={CostEstimatorPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route
          path="/login"
          render={() => (
            <LoginPage
              onLogin={() => {
                setIsAuthenticated(true);
                const user = authService.getCurrentUser();
                setUsername(user?.username || "");
              }}
            />
          )}
        />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </Router>
  );
};

export default App;
