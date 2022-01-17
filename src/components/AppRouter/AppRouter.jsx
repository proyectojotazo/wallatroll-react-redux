import { Router, Route, Switch, Redirect } from "react-router-dom";

import {
  Layout,
  AdvertPageContainer,
  NewAdvertPage,
  NotFoundPage,
  ConnectedPrivateRoute,
} from "..";

import {
  LoginPageContainer,
  RegisterPageContainer,
  AdvertsPageContainer,
} from "../../containers";

const AppRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <ConnectedPrivateRoute
            exact
            path="/adverts"
            component={AdvertsPageContainer}
          />
          <ConnectedPrivateRoute
            exact
            path="/adverts/new"
            component={NewAdvertPage}
          />
          <ConnectedPrivateRoute
            exact
            path="/advert/:id"
            component={AdvertPageContainer}
          />
          <Route exact path="/login" component={LoginPageContainer} />
          <Route exact path="/register" component={RegisterPageContainer} />
          <Route exact path="/">
            <Redirect to="/adverts" />
          </Route>
          <Route path="/404" component={NotFoundPage} />
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default AppRouter;
