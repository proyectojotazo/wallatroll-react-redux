const handleError = (error) => {
  const handledError = { message: "" };

  // Si se introduce un usuario incorrecto
  if (error.status === 401) {
    handledError["message"] = 'Wrong email or password'
  }

  // Si el servidor no está corriendo
  if (error.message === 'Network Error'){
    handledError["message"] = 'Could not connect to the server'
  }

  return handledError
};

export default handleError


