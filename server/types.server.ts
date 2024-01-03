export type RegistrationDetails = {
    name : string
    email : string
    password : string
}

export type LoginDetails = {
    email : string
    password : string
}

export type DocumentDetails = {
    email : string
    title : string
    tags : string[] | null
    filename : string
    preview : string
}