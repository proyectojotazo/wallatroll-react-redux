import { auth } from "./../../store/reducers";
import { AUTH_LOGIN_SUCCESS } from "./../../store/types";

describe("reducers", () => {
  describe("auth reducer", () => {
    test("should execute AUTH_LOGIN_SUCCESS action", () => {
      const action = {
        type: AUTH_LOGIN_SUCCESS,
      };
      expect(auth(undefined, action)).toBe(true);
    });
  });
});
