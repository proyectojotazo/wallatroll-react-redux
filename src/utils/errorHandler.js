const handleRegisterErrors = (error) => {
  const handledErrors = {};

  error.message.forEach((msg) => {
    if (msg.includes("email")) {
      handledErrors["email"] = msg;
    }
    if (msg.includes("password")) {
      handledErrors["password"] = msg;
    }
    // Sin !msg.includes... se introduce el error de username
    if (msg.includes("name") && !msg.includes("username")) {
      handledErrors["name"] = msg;
    }
    if (msg.includes("username")) {
      handledErrors["username"] = msg;
    }
  });

  return handledErrors;
};

const handleError = (error) => {
  const handledError = { message: "" };

  // Si se introduce un usuario incorrecto
  if (error.status === 401) {
    handledError["message"] = "Wrong email or password";
  }

  // Valores no validos en el formulario de registro
  if (error.status === 400) {
    handledError["message"] = handleRegisterErrors(error);;
  }

  // Si el servidor no está corriendo
  if (error.message === "Network Error") {
    handledError["message"] = "Could not connect to the server";
  }

  return handledError;
};

export default handleError;
