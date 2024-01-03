import ReactDOM from "react-dom/client"
import App from "./app.tsx"
import Register from "./authentication/register.tsx"
import Login from "./authentication/login.tsx"
import ErrorPage from "./error/error.tsx"
import Home from "./home/home.tsx"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRoutes from "./private.routes.tsx"
import UploadDocument from "./upload/upload.tsx"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { pdfjs } from "react-pdf"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/upload' element={<UploadDocument />}></Route>
        </Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
)
