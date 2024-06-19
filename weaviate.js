import { generateUuid5 } from 'weaviate-client';
import weaviate from 'weaviate-client'
import fs from 'fs';

const client = await weaviate.connectToLocal()

const myCollection = client.collections.get('Images');
const idArr = [];
for await (let item of myCollection.iterator()) {
    idArr.push(item.uuid);
}

const imgFiles = fs.readdirSync('./images');
// console.log(imgFiles)
const promises = imgFiles.map(async (imgFile) => {
    const b64 = Buffer.from(fs.readFileSync(`images/${imgFile}`)).toString('base64');
    const dataObj = {
        image: b64,
        text : imgFile.split('.')[0].split('_').join(' ')
    }
    const uuid = generateUuid5(JSON.stringify(dataObj))
    if (!idArr.includes(uuid)) {
        await myCollection.data.insert({
            properties: dataObj,
            id: uuid
        })
    }
})

await Promise.all(promises);