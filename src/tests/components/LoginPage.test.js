import LoginPage from "./../../components/LoginPage/LoginPage";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<LoginPage />", () => {
  /* Props */
  const onResetError = () => {};
  const isLoading = { yes: true, no: false };
  const showError = { yes: true, no: false };
  const error = {
    msg: "",
    show: showError.no,
  };
  /* Params */
  const email = "user";
  const password = "1234";
  const remember = true;
  const userToLog = {
    email,
    password,
    remember,
  };

  window.scrollTo = jest.fn(); // Para que sweetAlert no lance error

  test("should call onLogin", async () => {
    const onLogin = jest.fn().mockResolvedValue();
    
    render(
      <LoginPage
        onLogin={onLogin}
        onResetError={onResetError}
        isLoading={isLoading.no}
        error={error}
      />
    );

    const usernameField = screen.getByLabelText(/Email/);
    const passwordField = screen.getByLabelText(/Password/);
    const rememberField = screen.getByLabelText(/Remember me/);
    const submitButton = screen.getByRole("button");

    fireEvent.change(usernameField, { target: { value: email } });
    fireEvent.change(passwordField, { target: { value: password } });
    fireEvent.click(rememberField);
    fireEvent.click(submitButton);

    expect(onLogin).toHaveBeenCalledWith(userToLog);
  });
});
