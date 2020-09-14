import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Links, Create, Detail, Auth } from './pages/index';

export const useRoutes = (isAuthenticated) => {
   if (isAuthenticated) {
      return (
         <Switch>
            <Route path="/links" exact>
               <Links />
            </Route>

            <Route path="/create" exact>
               <Create />
            </Route>

            <Route path="/detail/:id">
               <Detail />
            </Route>

            <Redirect to="/create" />
         </Switch>
      );
   }

   // for not authrized
   return (
      <Switch>
         <Route path="/" exact>
            <Auth />
         </Route>

         <Redirect to="/" />
      </Switch>
   );
};
