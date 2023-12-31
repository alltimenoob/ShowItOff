import axios, {  AxiosResponse } from "axios";
import {  useEffect, useState } from "react";
import FloatingLabel from "../components/floatinglabel";
import {  Document, Page ,pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


interface DocumentData {
    name : string
    type : string
    data : string
}

const getPDFByteArray = (pdf : string) => {
    const byteCharacters = atob(pdf);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: 'application/pdf'});
}
export default function Home(){
    const [documents,setDocuments] = useState<DocumentData[]>([])
    const [uploadProgress,setUploadProgress] = useState<number>(0)
    const [uploadStatus,setUploadSatus] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    useEffect(()=>{
        axios.post('/api/documents',
        {
            email : localStorage.getItem('email'),
            existingFiles : documents.map((document : DocumentData)=>document.name)
        },{ headers: { 'authorization' : 'Bearer ' +localStorage.getItem('token') }})
        .then((response : AxiosResponse)=>{
                setDocuments(documents.concat(response.data))
            })
    },[uploadStatus])

    const uploadFile = (event : React.ChangeEvent<HTMLInputElement>)=>{
        event.preventDefault()

        if(!event.target.files || event.target.files == undefined) return

        const formData = new FormData();
        formData.append('email',localStorage.getItem('email') as string)
        formData.append('file',event.target.files[0])

        if( !(event.target.files[0].type == "application/pdf" || event.target.files[0].type == "image/png") ){
            setError("Error : Only PNG and PDF allowed")
            setTimeout(()=>{setError(undefined)},5000)
            return event.target.value = ''
        }

        if(event.target.files[0].size > 1000000){
            setError("Error : File Size Exceeded")
            setTimeout(()=>{setError(undefined)},5000)
            return event.target.value = ''
        }

        axios.post('/api/upload',formData,{
            headers: {
                'Authorization' : localStorage.getItem('token'),
                'content-type': 'multipart/form-data',
            },
            onUploadProgress: data =>{
                if(data.total)
                setUploadProgress(Math.round((40 * data.loaded) / data.total))
            }
        }).then((_ : AxiosResponse)=>{
            setUploadSatus(!uploadStatus)
        })
    }

   
    return(
        <div className="lg:text-3xl text-xl lg:p-10 p-5 w-full font-mono font-bold text-blue-400 ">
            
            <div className="w-full flex justify-between select-none">
                <span>Welcome, {localStorage.getItem('name')} </span>
    
                <a className="text-red-400 cursor-pointer" href="/" onClick={(_)=>{
                    localStorage.clear()
                }}>Log Out</a>
            </div>

            <section className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 justify-items-center">

                <form className={`mt-10 lg:w-40 lg:h-40 sm:h-36 sm:w-36 xs:h-32 xs:w-32 text-sm relative lg:justify-self-start xs:justify-self-center flex justify-center
                    cursor-pointer items-center text-clip text-blue-400 bg-blue-100 rounded-xl select-none`}
                    encType="multipart/form-data" name="file" >
                    <p className="block absolute xs:text-xs">Upload Document</p>
                    <div style={ { width : uploadProgress + 'rem' }} className="h-full"></div>
                    <input className="block absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer" 
                     type="file"
                     accept="image/png, application/pdf" 
                     onChange={uploadFile} />
                </form>

                {documents && documents.map((document : any,index)=>{
                     return <form key={index} className="mt-10 lg:w-40 lg:h-40 sm:h-36 sm:w-36 xs:h-32 xs:w-32  text-sm  text-clip text-blue-400 bg-blue-100 rounded-xl select-none " >
                        {document.type == 'png' && <img className="w-full h-full object-cover rounded-xl" src={`data:image/png;base64,${document.data}`}  />}
                        {document.type == 'pdf' && <Document className="lg:w-40 lg:h-40 sm:h-36 sm:w-36 xs:h-32 xs:w-32   flex justify-center rounded-xl overflow-hidden" file={getPDFByteArray(document.data)}  >
                            <Page className="content-stretch" pageNumber={1} renderMode={'canvas'} renderTextLayer={false} width={180} />
                            </Document>}
                        {/* {document.type == 'pdf' &&  <object className="w-full h-full rounded-xl  "  data={`data:application/pdf;base64,${document.data}`} />} */}
                    </form>
                })}
            
            </section>
            {error && <FloatingLabel>{error}</FloatingLabel>}
        </div>
    )
}