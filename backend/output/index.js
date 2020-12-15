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
const iceCreamDB = firebase_admin_1.default.firestore();
const app = express_1.default();
const port = 8080;
app.use(body_parser_1.default.json());
const flavorCollection = iceCreamDB.collection('posts');
// create a flavor
app.post('/addFlavor', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const flavorToAdd = req.body;
        const flavorDoc = flavorCollection.doc();
        yield flavorDoc.set(flavorToAdd);
        res.send(flavorDoc.id);
    });
});
// read all flavors
app.get('/getFlavors', function (_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const allFlavorDocs = yield flavorCollection.get();
        const retrievedFlavors = [];
        for (let doc of allFlavorDocs.docs) {
            let currFlavor = doc.data();
            currFlavor.id = doc.id;
            retrievedFlavors.push(currFlavor);
        }
        res.send(retrievedFlavors);
    });
});
// read flavor by name
app.get('/getFlavor/:name', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const namedFlavorDocs = yield flavorCollection
            .where('name', '==', req.params.name)
            .get();
        const retrievedFlavor = [];
        for (let doc of namedFlavorDocs.docs) {
            let currFlavor = doc.data();
            currFlavor.id = doc.id;
            retrievedFlavor.push(currFlavor);
        }
        res.send(retrievedFlavor);
    });
});
// read flavors that are out of stock
app.get('/getOutOfStock', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const outOfStockDocs = yield flavorCollection
            .where('qty', '==', 0)
            .get();
        const retrievedFlavors = [];
        for (let doc of outOfStockDocs.docs) {
            let post = doc.data();
            post.id = doc.id;
            retrievedFlavors.push(post);
        }
        res.send(retrievedFlavors);
    });
});
// update a flavor
app.post('/updateFlavor/:id/:qty', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const qty = parseInt(req.params.qty);
        yield flavorCollection.doc(id).update({ qty });
        res.send('UPDATED');
    });
});
// delete a flavor
app.delete('/deleteFlavor/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        yield flavorCollection.doc(id).delete();
        res.send('DELETED');
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
