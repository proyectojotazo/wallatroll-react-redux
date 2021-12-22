import { Provider } from "react-redux";
import { AppRouter } from "./components";

const App = ({ store, history }) => {
  return (
    <Provider store={store}>
      <AppRouter history={history} />
    </Provider>
  );
}

export default App;
