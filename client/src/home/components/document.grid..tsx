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
  if (error) return <span> {error.message} </span>
  if (data)
    return data.getDocuments.map((document: Document, index: number) => {
      return (
        <DocumentCard key={index} document={document}  />
      )
    })
}
