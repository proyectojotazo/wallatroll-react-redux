const handleRegisterErrors = (error) => {
  const types = ["email", "password", "name", "username"];

  const handledErrors = {};

  error.message.forEach((err) => {
    types.forEach((type) => {
      const re = new RegExp(`^${type}`, "g");
      if (re.test(err)) handledErrors[type] = err;
    });
  });

  return handledErrors;
};

const handleError = (error) => {
  let handledError = {};

  // Si se introduce un usuario incorrecto
  if (error.status === 401) {
    handledError["message"] = "Wrong email or password";
  }

  // Valores no validos en el formulario de registro
  if (error.status === 400) {
    handledError["message"] = handleRegisterErrors(error);
  }

  if (error.status === 500 && error.message === "Internal server error") {
    handledError["message"] = "Username or Email is already in use";
  }

  // Si el servidor no está corriendo
  if (error.message === "Network Error") {
    handledError["message"] = { server: "Could not connect to the server" };
  }

  return handledError;
};

export default handleError;
