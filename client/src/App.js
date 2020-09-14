// 2:00

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import './scss/index.scss';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import Nav from './components/Nav';
import Loader from './components/Loader';

function App() {
   const { token, userId, login, logout, ready } = useAuth();
   const isAuthenticated = !!token;

   const routes = useRoutes(isAuthenticated);

   if (!ready) {
      return <Loader />;
   }

   return (
      <AuthContext.Provider
         value={{
            token,
            login,
            logout,
            userId,
            isAuthenticated,
         }}>
         <Router>
            {isAuthenticated && <Nav />}
            {routes}
         </Router>
      </AuthContext.Provider>
   );
}

export default App;
