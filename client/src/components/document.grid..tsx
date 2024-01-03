import DocumentCard from "./document.card"

export default function DocumentGrid({ loading, error, data }: any) {
  if (loading)
    return Array(4)
      .fill(0)
      .map((_, index) => <DocumentCard key={index} document={null} />)
  if (error) return <span> {error} </span>
  if (data)
    return data.getDocuments.map((document: any, index: number) => {
      return (
        <DocumentCard key={index} document={{ title: document.title, preview: document.preview }} />
      )
    })
}
