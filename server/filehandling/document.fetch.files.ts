const fs = require('fs')

interface FileData{
    name : string
    type : string
    data : string
}

export default async function getFileData(email : string, existingFiles : string[]) : Promise<FileData[]> {
    var names : string[] = [];
    var fileData : FileData[] = []
    await fs.promises.readdir('./uploads').then((files : any) => {
        
        files.forEach((element: string)  =>  {
          if(element.split('-')[0] == email){
            names.push(element)
          }
        });

        names = names.filter((file1)=>existingFiles.every((file2)=>file2!=file1))
    
        names.forEach((fileName)=>{
            fileData.push({ name : fileName, type: fileName.split('-').reverse()[0].split('.').reverse()[0].toLowerCase() ,data : Buffer.from(fs.readFileSync('./uploads/'+fileName)).toString('base64')});
        })
    })

    return fileData
}