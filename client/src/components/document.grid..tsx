import { Document } from "../home/home"
import DocumentCard from "./document.card"
import DocumentCardSkeleton from "./document.card.skeleton"


export default function DocumentGrid({ loading, error, data }: any) {
  if (loading) return Array(4).fill(0).map((_,index)=><DocumentCardSkeleton key={index} />)
  if (error) return <span> {error} </span>
  if (data)
    return data.getDocuments.map((document: Document, index: number) => {
      return (
        <DocumentCard key={index} document={document}  />
      )
    })
}
