import { ApolloError } from "@apollo/client"
import { Document } from "../home"
import DocumentCard from "./document.card"
import DocumentCardSkeleton from "./document.card.skeleton"


export type useQueryData = {
  loading : boolean
  error : ApolloError | undefined
  data : {
    getDocuments: Document[]
  }
}

export default function DocumentGrid({ loading, error, data } : useQueryData) {
  if (loading) return Array(4).fill(0).map((_,index)=><DocumentCardSkeleton key={index} />)
  if (error) return <div className="w-full h-full top-0 flex justify-center items-center fixed"><span> {error.message} </span></div>
  if (data && data.getDocuments.length)
    return data.getDocuments.map((document: Document, index: number) => {
      return (
        <DocumentCard key={index} document={document}  />
      )
    })
  if(data && !data.getDocuments.length){
    return(
    <div className="self-stretch col-span-8">
      <div className="w-full h-full mt-10 flex justify-center items-center">
      <span className="text-base whitespace-nowrap text-gray-400"> No documents 💔, but you can change it using that button 😼</span>
      </div>
    </div>)
  }
}
