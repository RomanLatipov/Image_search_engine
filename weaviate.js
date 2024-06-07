import weaviate from 'weaviate-ts-client';
import fs from 'fs';

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

// const schemaRes = await client.schema.getter().do();

// const img = fs.readFileSync('images/morpheus.jpg');
// const b64 = Buffer.from(img).toString('base64');
// await client.data.creator().withClassName('Images').withProperties({
//     image: b64,
//     text: 'test'
// }).do();

const imgFiles = fs.readdirSync('./images');
// console.log(imgFiles)
const promises = imgFiles.map(async (imgFile) => {
    const b64 = Buffer.from(fs.readFileSync(`images/${imgFile}`)).toString('base64');

    await client.data.creator().withClassName("Images").withProperties({
        image: b64,
        text : imgFile.split('.')[0].split('_').join(' ')
    }).do();
})

await Promise.all(promises);