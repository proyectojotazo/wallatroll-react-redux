import { getIsLogged } from "../store/selectors";

describe("selectors", () => {
  describe("getIsLogged", () => {
    test("should return isLogged state", () => {
      const state = { auth: true };
      const expected = state.auth;
      const result = getIsLogged(state);
      
      expect(result).toEqual(expected);
    });
  });
});
