import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './theme';

// Pages
import RecipeSwipe from './pages/RecipeSwipe';
import SavedRecipes from './pages/SavedRecipes';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// Components
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <RecipeSwipe />
                </PrivateRoute>
              }
            />
            <Route
              path="/saved"
              element={
                <PrivateRoute>
                  <SavedRecipes />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
