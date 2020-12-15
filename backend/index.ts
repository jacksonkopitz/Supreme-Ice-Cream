import admin from 'firebase-admin';
import express from 'express';
// also install type aliases for Request, Response - ???, from website
import bodyParser from 'body-parser';

const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://supreme-ice-cream-default-rtdb.firebaseio.com',
});

const iceCreamDB = admin.firestore();

const app = express();
const port = 8080;
app.use(bodyParser.json());

// Type for our Post document stored in Firebase
type Flavor = {
  name: string;
  qty: string;
};

// Add id field to Flavor
type FlavorWithID = Flavor & {
  id: string;
};

const flavorCollection = iceCreamDB.collection('posts');

// create a flavor
app.post('/addFlavor', async function (req, res) {
  const flavorToAdd: Flavor = req.body;
  const flavorDoc = flavorCollection.doc();
  await flavorDoc.set(flavorToAdd);
  res.send(flavorDoc.id);
});

// read all flavors
app.get('/getFlavors', async function (_, res) {
  const allFlavorDocs = await flavorCollection.get();
  const retrievedFlavors: FlavorWithID[] = [];
  for (let doc of allFlavorDocs.docs) {
    let currFlavor: FlavorWithID = doc.data() as FlavorWithID;
    currFlavor.id = doc.id;
    retrievedFlavors.push(currFlavor);
  }
  res.send(retrievedFlavors);
});

// read flavor by name
app.get('/getFlavor/:name', async function (req, res) {
  const namedFlavorDocs = await flavorCollection
    .where('name', '==', req.params.name)
    .get();
  const retrievedFlavor: FlavorWithID[] = [];
  for (let doc of namedFlavorDocs.docs) {
    let currFlavor: FlavorWithID = doc.data() as FlavorWithID;
    currFlavor.id = doc.id;
    retrievedFlavor.push(currFlavor);
  }
  res.send(retrievedFlavor);
});

// read flavors that are out of stock
app.get('/getOutOfStock', async function (req, res) {
  const outOfStockDocs = await flavorCollection
    .where('qty', '==', 0)
    .get();
  const retrievedFlavors: FlavorWithID[] = [];
  for (let doc of outOfStockDocs.docs) {
    let post: FlavorWithID = doc.data() as FlavorWithID;
    post.id = doc.id;
    retrievedFlavors.push(post);
  }
  res.send(retrievedFlavors);
});

// update a flavor
app.post('/updateFlavor/:id/:qty', async function (req, res) {
  const id: string = req.params.id;
  const qty: number = parseInt(req.params.qty);
  await flavorCollection.doc(id).update({ qty });
  res.send('UPDATED');
});


// delete a flavor
app.delete('/deleteFlavor/:id', async function (req, res) {
  const id: string = req.params.id;
  await flavorCollection.doc(id).delete();
  res.send('DELETED');
});

// app.delete('/deleteFlavor/:id', async function (req, res) {
//   admin.auth().verifyIdToken(req.headers.idtoken as string)
//     .then(async () => {
//       const id: string = req.params.id;
//       await flavorCollection.doc(id).delete();
//       res.send('DELETED');
//     })
//     .catch(() => { console.log('auth err') }
//     )
// });

// app.post('/createSong', async (req, res) => {
//   admin
//     .auth()
//     .verifyIdToken(req.headers.idtoken as string)
//     .then(async () => {
//       const newSong = req.body;
//       const addedSong = await songsCollection.add(newSong);
//       res.send(addedSong.id);
//     })
//     .catch(() => {
//       console.log('auth error');
//     });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));