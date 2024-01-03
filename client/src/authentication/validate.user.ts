const validateEmail = (email: string) => {
  const pattern =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/
  return pattern.test(email)
}

const validateName = (name: string) => {
  const pattern = /^(?=\S*[a-z])|(?=\S*[A-Z])\S{1,8}$/
  return pattern.test(name)
}

const validatePassword = (password: string) => {
  const pattern = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)\S{8,}$/
  return pattern.test(password)
}

export { validateEmail, validateName, validatePassword }
