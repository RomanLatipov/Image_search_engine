import weaviate from 'weaviate-ts-client';
import fs from 'fs'

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

const test = Buffer.from(fs.readFileSync('./test.jpg')).toString('base64');

const resImage = await client.graphql.get().withClassName('Images').withFields(['image']).withNearImage({image: test}).withLimit(3).do();

let result;
for (let i=0; i<3; i++){
    result = resImage.data.Get.Images[i].image;
    fs.writeFileSync(`./result${i}.jpg`, result, 'base64');
}
