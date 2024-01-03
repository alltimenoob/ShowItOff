const fs = require("fs")

export default async function getFileData(fileNames: string[], existingFiles: string[]) {
  var fileData: string[] = []

  fileNames = fileNames.filter((file1) => existingFiles.every((file2) => file2 != file1))

  fileNames.forEach((fileName) => {
    fileData.push(Buffer.from(fs.readFileSync("./uploads/" + fileName)).toString("base64"))
  })

  return fileData
}
