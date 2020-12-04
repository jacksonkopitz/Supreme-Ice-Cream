"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
// also install type aliases for Request, Response - ???, from website
const body_parser_1 = __importDefault(require("body-parser"));
const serviceAccount = require('../service-account.json');
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: 'https://supreme-ice-cream-default-rtdb.firebaseio.com',
});
const db = firebase_admin_1.default.firestore();
const app = express_1.default();
const port = 3000;
app.use(body_parser_1.default.json());
const postsCollection = db.collection('posts');
// create a flavor
app.post('/addFlavor', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = req.body;
        const myDoc = postsCollection.doc();
        yield myDoc.set(post);
        res.send(myDoc.id);
    });
});
// read all flavors
app.get('/getFlavors', function (_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // we don't use the first request parameter
        const allPostsDoc = yield postsCollection.get();
        const posts = [];
        for (let doc of allPostsDoc.docs) {
            let post = doc.data();
            post.id = doc.id;
            posts.push(post);
        }
        res.send(posts);
    });
});
// read flavor by name
app.get('/getFlavor/:name', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const namePostsDoc = yield postsCollection
            .where('name', '==', req.params.name)
            .get();
        const posts = [];
        for (let doc of namePostsDoc.docs) {
            let post = doc.data();
            post.id = doc.id;
            posts.push(post);
        }
        res.send(posts);
    });
});
// read flavors that are out of stock
app.get('/getOutOfStock', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const namePostsDoc = yield postsCollection
            .where('qty', '==', 0)
            .get();
        const posts = [];
        for (let doc of namePostsDoc.docs) {
            let post = doc.data();
            post.id = doc.id;
            posts.push(post);
        }
        res.send(posts);
    });
});
// update a flavor
app.post('/updateFlavor/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const newPost = req.body;
        yield postsCollection.doc(id).update(newPost);
        res.send('UPDATED');
    });
});
// delete a flavor
app.delete('/deleteFlavor/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        yield postsCollection.doc(id).delete();
        res.send('DELETED');
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
