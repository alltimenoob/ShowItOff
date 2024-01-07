import React, { SyntheticEvent, useRef, useState } from "react"
import { Document, Page } from "react-pdf"
import FloatingLabel from "../error/floatinglabel"
import DomToImage from "dom-to-image"
import axios, { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

interface UploadInputs {
  title: { value: string; status: number }
}

enum FileType {
  PNG = "image/png",
  PDF = "application/pdf",
}

interface CustomFile {
  raw: string
  fileObj: File | string
}

const getFileSize: (size: number) => string = (size: number) => {
  if (size > 1000) {
    return size / 1000 + " KB"
  }
  return size + " Bytes"
}

const getImageOfDom = (ref: HTMLElement | null ) => {
  if(!ref) return console.error("oops, html error!")
  return DomToImage.toPng(ref)
    .then(function (dataUrl) {
      return dataUrl
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error)
    })
}

export default function UploadDocument() {
  const [input, setInputs] = useState<UploadInputs>({
    title: { value: "", status: 200 },
  })
  const ref = useRef(null)
  const [file, setFile] = useState<CustomFile>({
    raw: "",
    fileObj: "",
  })
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()

  const handleChange = (name: string) => (status: number) => (event: any) => {
    event.preventDefault()
    const value = event.target.value
    setInputs((prevState) => ({ ...prevState, [name]: { value, status } }))
  }

  const handleUpload = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    if (typeof file.fileObj != "object") return
    const preview = await getImageOfDom(ref.current)
    const title = input.title.value
    const filename = file.fileObj.name
    const email = localStorage.getItem("email")

    const formData = new FormData()
    formData.append("email", email as string)
    formData.append("file", file.fileObj)
    formData.append("title", title)
    formData.append("preview", preview as string)
    formData.append("filename", filename)

    if (!preview || !title || !filename || !email) return setError("Something went wrong!")

    axios
      .put("/api/document", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response: AxiosResponse) => {
        console.log(response)
        if (response.data.status == 201) {
          navigate("/home", { replace: true })
        } else {
          setError(response.data.msg)
          setTimeout(() => setError(""), 3000)
        }
      })
  }

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    if (!event.target.files) return
    if (
      FileReader &&
      (event.target.files[0].type == FileType.PNG || event.target.files[0].type == FileType.PDF) &&
      event.target.files[0].size < 1000000
    ) {
      const fr = new FileReader()
      fr.onload = function () {
        if (fr.result && event.target.files)
          setFile({
            raw: fr.result.toString(),
            fileObj: event.target.files[0],
          })
      }
      fr.readAsDataURL(new Blob([event.target.files[0], "application/pdf"]))
    } else {
      setError("File not valid. (PDF and PNG allowed, Max 1MB)")
      setTimeout(() => setError(""), 3000)
    }
  }

  return (
    <div className='font-mono font-semibold min-h-screen min-w-screen flex flex-col items-center justify-center '>
      <form className='min-w-[20rem] flex flex-col p-5 lg:shadow-lg lg:w-[40rem] lg:h-[40rem] lg:border-2 w-full gap-3'>
        <span className='flex-1 text-2xl text-blue-400 self-center  whitespace-nowrap '>
          Upload your document
        </span>
        <section className='flex flex-col'>
          <article className='flex-1 min-h-20 flex gap-2 p-1 justify-start items-center xs:flex-col md:flex-row w-full'>
            <div ref={ref}>
              <div
                className={`${
                  file.raw != "" ? "" : "border-2 border-blue-400 border-dotted"
                } md:h-60 md:w-60 h-44 w-44 flex items-center justify-center overflow-hidden`}
              >
                {file.raw != "" ? (
                  typeof file.fileObj == "object" && file.fileObj.type == FileType.PNG ? (
                    <img className='object-cover resize w-full h-full' src={`${file.raw}`} />
                  ) : (
                    <Document className='h-full w-full resize object-cover' file={file.raw}>
                      <Page
                        pageNumber={1}
                        scale={3}
                        width={100}
                        renderTextLayer={false}
                        renderMode='canvas'
                      />
                    </Document>
                  )
                ) : (
                  <span className='text-gray-400'>Preview Here</span>
                )}
              </div>
            </div>
            <div className='flex-1 flex justify-center items-center xs:w-full '>
              <label
                className='relative text-center p-2 m-1 xs:w-full md:w-fit bg-blue-100 shadow-blue-200 shadow-md text-blue-400 rounded-md border border-blue-300 cursor-pointer text-base' 
                htmlFor={"file"}
              >
                Select Document
              </label>
              <input
                id='file'
                type='file'
                onChange={handleFile}
                accept='image/png, application/pdf'
                className='hidden'
              />
            </div>
          </article>
          <section className='flex md:flex-row flex-col justify-evenly items-stretch'>
            <input
              className={`flex-1 rounded p-3 m-1 border-2 text-gray-700`}
              type='text'
              placeholder='Filename'
              value={typeof file.fileObj == "object" ? file.fileObj.name : ""}
              disabled
            />
            <input
              className={`flex-1 rounded p-3 m-1 border-2 text-gray-700`}
              type='text'
              placeholder='Size'
              value={
                typeof file.fileObj == "object" && file.fileObj.size > 0
                  ? getFileSize(file.fileObj.size)
                  : ""
              }
              disabled
            />
          </section>
          <article className='flex flex-col'>
            <textarea
              className={`flex-1 rounded p-3 m-1 border-2 text-gray-700`}
              rows={4}
              placeholder='Tags (in Future)'
              disabled
            ></textarea>

            <input
              className={`rounded p-3 m-1 border-2 border-blue-400 text-gray-700`}
              value={input.title.value}
              onChange={handleChange("title")(200)}
              type='text'
              placeholder='Title'
            />
            <button
              onClick={handleUpload}
              className=' p-3 m-1 text-white bg-blue-400 border rounded cursor-pointer select-none'
            >
              Upload
            </button>
          </article>
        </section>
      </form>
      {error != "" && <FloatingLabel>{error}</FloatingLabel>}
    </div>
  )
}

/*  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!event.target.files || event.target.files == undefined) return;

    const formData = new FormData();
    formData.append("email", localStorage.getItem("email") as string);
    formData.append("file", event.target.files[0]);

    if (
      !(
        event.target.files[0].type == "application/pdf" ||
        event.target.files[0].type == "image/png"
      )
    ) {
      setError("Error : Only PNG and PDF allowed");
      setTimeout(() => {
        setError(undefined);
      }, 5000);
      return (event.target.value = "");
    }

    if (event.target.files[0].size > 1000000) {
      setError("Error : File Size Exceeded");
      setTimeout(() => {
        setError(undefined);
      }, 5000);
      return (event.target.value = "");
    }

    axios
      .post("/api/upload", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          if (data.total)
            setUploadProgress(Math.round((40 * data.loaded) / data.total));
        },
      })
      .then((_: AxiosResponse) => {
        setUploadSatus(!uploadStatus);
      });
  };
*/
