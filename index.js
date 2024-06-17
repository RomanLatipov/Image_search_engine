import express from 'express';
import cors from 'cors';
import weaviate from 'weaviate-client'
import fs from 'fs'

const app = express()
const port = 5555

app.use(express.json({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());

const client = await weaviate.connectToLocal()
 
async function nearImage(contentsBase64) {
  const myCollection = client.collections.get('Images');
  // const contentsBase64 = await fs.promises.readFile('./test.jpg', { encoding: 'base64' });
  const result = await myCollection.query.nearImage(contentsBase64, {
    returnProperties: ['image'],
    limit: 3,
  })
// console.log(result.objects[0].properties.image);

  // for (let i=0; i<3; i++){
  //     fs.writeFileSync(`./result${i}.jpg`, result.objects[i].properties.image, 'base64');
  // }
  return {"string0": result.objects[0].properties.image,
          "string1": result.objects[1].properties.image,
          "string2": result.objects[2].properties.image}
} 

app.post('/post_rqst', (req, res) => {
  // res.send(req.body);
  // fs.writeFileSync('./test.jpg', req.body.string, 'base64');

  (async () => {
    res.json(await nearImage(req.body.string))
  })()
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})


// for await (let item of myCollection.iterator()) {
//   console.log(item.uuid, item.properties);
// }

// const img = fs.readFileSync('images/download-2.jpg');
// const b64 = Buffer.from(img).toString('base64');
// const dataObj = {
//     image: b64,
//     text : 'download-2'
// }
// console.log(generateUuid5(JSON.stringify(dataObj)))

// import weaviate from 'weaviate-ts-client';
// import fs from 'fs'

// const client = weaviate.client({
//     scheme: 'http',
//     host: 'localhost:8080',
// });

// const test = Buffer.from(fs.readFileSync('./test.jpg')).toString('base64');

// const resImage = await client.graphql.get().withClassName('Images').withFields(['image']).withNearImage({image: test}).withLimit(3).do();

// let result;
// for (let i=0; i<3; i++){
//     result = resImage.data.Get.Images[i].image;
//     fs.writeFileSync(`./result${i}.jpg`, result, 'base64');
// }

// const myCollection = client.collections.get('Images');