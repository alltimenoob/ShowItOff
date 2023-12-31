
const validateEmail = (email : string) => {
    const pattern = /[a-z][0-9]*@.[a-z]/
    return pattern.test(email)
}

const validateName = (name : string) => {
    const pattern = /[a-z]/
    return pattern.test(name)
}

const validatePassword = (password : string) => {
    const pattern = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)\S{8,}$/
    return pattern.test(password)
}

export { validateEmail, validateName , validatePassword}