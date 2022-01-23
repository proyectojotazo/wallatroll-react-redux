import {
  getUi,
  getIsLoading,
  getIsLogged,
  getAdverts,
} from "../../store/selectors";

import { defaultState } from "./../../store/reducers";

describe("selectors", () => {
  describe("getUi", () => {
    test("should return Ui state", () => {
      const expected = defaultState.ui;
      const result = getUi(defaultState);

      expect(result).toEqual(expected);
    });
  });

  describe("getIsLoading", () => {
    test("should return isLoading state", () => {
      const expected = defaultState.ui.isLoading;
      const result = getIsLoading(defaultState);

      expect(result).toEqual(expected);
    });
  });

  describe("getIsLogged", () => {
    test("should return isLogged state", () => {
      const expected = defaultState.auth;
      const result = getIsLogged(defaultState);

      expect(result).toEqual(expected);
    });
  });

  describe("getAdverts", () => {
    test("should return adverts data", () => {
      const adverts = [
        { id: "1", name: "item" },
        { id: "2", name: "item2" },
      ];

      defaultState.adverts.data = adverts;

      const expected = defaultState.adverts.data;
      const result = getAdverts(defaultState);

      expect(result).toEqual(expected);
    });
  });

  describe("getAdvert", () => {
    test("should return adverts data", () => {
      const adverts = [
        { id: "1", name: "item" },
        { id: "2", name: "item2" },
      ];

      defaultState.adverts.data = adverts;

      const expected = defaultState.adverts.data;
      const result = getAdverts(defaultState);

      expect(result).toEqual(expected);
    });
  });
});
