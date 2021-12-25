import {
  Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import ConnectedPrivateRoute from "./PrivateRoute";

import {
  Layout,
  ConnectedLoginPage,
  RegisterPage,
  AdvertPage,
  AdvertsPage,
  NewAdvertPage,
  NotFoundPage,
} from "..";

const AppRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <ConnectedPrivateRoute exact path="/adverts" component={AdvertsPage} />
          <ConnectedPrivateRoute exact path="/adverts/new" component={NewAdvertPage} />
          <ConnectedPrivateRoute exact path="/advert/:id" component={AdvertPage} />
          <Route exact path="/login" component={ConnectedLoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/">
            <Redirect to="/adverts" />
          </Route>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default AppRouter;
