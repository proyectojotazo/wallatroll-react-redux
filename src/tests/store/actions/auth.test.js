import { authLogin } from "../../../store/actions/auth";
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
} from "../../../store/types";

describe("authLogin", () => {
  const credentials = "credentials";
  const action = authLogin(credentials);
  const dispatch = jest.fn();
  const getState = () => {};

  const history = {
    location: {},
    replace: jest.fn(),
  };
  const api = {
    userServices: {},
  };

  window.scrollTo = jest.fn(); // Para que sweetAlert no lance error

  describe("when login api resolves", () => {
    api.userServices = { login: jest.fn().mockResolvedValue(credentials) };
    const defaultPathname = { pathname: "/" };
    const fromNewAdvert = "adverts/new";

    test("should dispatch an AUTH_LOGIN_REQUEST action", () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: AUTH_LOGIN_REQUEST });
    });

    test("should dispatch an AUTH_LOGIN_SUCCESS action", async () => {
      await action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenNthCalledWith(2, { type: AUTH_LOGIN_SUCCESS });
    });

    test("should call history.replace", async () => {
      await action(dispatch, getState, { api, history });
      expect(history.replace).toHaveBeenCalledTimes(1);
    });

    test("should call history.replace with default pathname '/'", async () => {
      await action(dispatch, getState, { api, history });
      expect(history.replace).toHaveBeenCalledWith(defaultPathname);
    });

    test("should call history.replace with 'adverts/new'", async () => {
      history.location = { state: { from: fromNewAdvert } };
      await action(dispatch, getState, { api, history });
      expect(history.replace).toHaveBeenCalledWith(fromNewAdvert);
    });
  });
  describe("when login api rejects", () => {
    const error = { message: "Unhandled Error" };
    test("should dispatch an AUTH_LOGIN_FAILURE action", async () => {
      api.userServices = {
        login: jest.fn().mockRejectedValue(error),
      };
      await action(dispatch, getState, { api, history });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: AUTH_LOGIN_FAILURE,
        error: true,
        payload: error.message,
      });
    });
  });
});
