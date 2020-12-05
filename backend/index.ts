import admin from 'firebase-admin';
import express from 'express';
// also install type aliases for Request, Response - ???, from website
import bodyParser from 'body-parser';

const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://supreme-ice-cream-default-rtdb.firebaseio.com',
});

const db = admin.firestore();

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

const postsCollection = db.collection('posts');

// create a flavor
app.post('/addFlavor', async function (req, res) {
  const post: Flavor = req.body;
  const myDoc = postsCollection.doc();
  await myDoc.set(post);
  res.send(myDoc.id);
});

// read all flavors
app.get('/getFlavors', async function (_, res) {
  // we don't use the first request parameter
  const allPostsDoc = await postsCollection.get();
  const posts: FlavorWithID[] = [];
  for (let doc of allPostsDoc.docs) {
    let post: FlavorWithID = doc.data() as FlavorWithID;
    post.id = doc.id;
    posts.push(post);
  }
  res.send(posts);
});

// read flavor by name
app.get('/getFlavor/:name', async function (req, res) {
  const namePostsDoc = await postsCollection
    .where('name', '==', req.params.name)
    .get();
  const posts: FlavorWithID[] = [];
  for (let doc of namePostsDoc.docs) {
    let post: FlavorWithID = doc.data() as FlavorWithID;
    post.id = doc.id;
    posts.push(post);
  }
  res.send(posts);
});

// read flavors that are out of stock
app.get('/getOutOfStock', async function (req, res) {
  const namePostsDoc = await postsCollection
    .where('qty', '==', 0)
    .get();
  const posts: FlavorWithID[] = [];
  for (let doc of namePostsDoc.docs) {
    let post: FlavorWithID = doc.data() as FlavorWithID;
    post.id = doc.id;
    posts.push(post);
  }
  res.send(posts);
});

// update a flavor
app.post('/updateFlavor/:id/:qty', async function (req, res) {
  const id: string = req.params.id;
  const qty: number = parseInt(req.params.qty);
  await postsCollection.doc(id).update({ qty });
  res.send('UPDATED');
});


// delete a flavor
app.delete('/deleteFlavor/:id', async function (req, res) {
  const id: string = req.params.id;
  await postsCollection.doc(id).delete();
  res.send('DELETED');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));