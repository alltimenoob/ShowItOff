export type RegistrationDetails = {
  name: string
  email: string
  password: string
}

export type LoginDetails = {
  email: string
  password: string
}

export type DocumentDetails = {
  email: string
  title: string
  tags: string[] | null
  filename: string
  preview: string
}

// Mailer
export type MailParameters = {
  from: {
    name: string
    address: string
  }
  to: string[]
  subject: string
  attachments: {
    filename: string
    content: string
    encoding: string
  }[]
}

// Graphql

export type UserInterface = {
  email: string
}

export type MyContext = {
  user: UserInterface
}

// ENVIORMENT

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      NODE_ENV: "devlopement" | "production"
      TOKEN_SECRET: string
      DATABASE_URL: string
      MAILER_USER: string
      MAILER_PASS: string
    }
  }
}
