import { weaviate, generateUuid5 } from 'weaviate-client';
import fs from 'fs';

const client = await weaviate.connectToLocal()

// const schemaRes = await client.schema.getter().do();

// const img = fs.readFileSync('images/morpheus.jpg');
// const b64 = Buffer.from(img).toString('base64');
// await client.data.creator().withClassName('Images').withProperties({
//     image: b64,
//     text: 'test'
// }).do();

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
    if (!idArr.includes(uuid))
        await client.data.creator().withClassName("Images").withProperties(dataObj).withId(uuid).do();
})

await Promise.all(promises);