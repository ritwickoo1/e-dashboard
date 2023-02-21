const express = require('express');
const cors = require('cors');
require('./db/config')
const Product = require('./db/Product');
const User = require('./db/User');
const Jwt = require('jsonwebtoken');
const jwtKey = "my_secret_key";
const app = express();
app.use(express.json())
app.use(cors());
app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toJSON();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            res.status(401).send({ error: 'Invalid Credentials' });
        } else {
            res.send({ result, auth: token });
        }
    });
});
app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    res.status(401).send({ error: 'Invalid Credentials' });
                } else {
                    res.send({ user, auth: token });
                }
            });
        } else {
            res.status(401).send({ error: 'Invalid Credentials' });
        }
    } else {
        res.status(400).send({ error: 'Email and Password are required' });
    }
});

app.post('/add-Product', verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products) {
        res.send(products);
    } else {
        res.status(401).send({ error: 'No Products Found' });
    }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) {
        res.send({ message: 'Product Deleted Successfully' });
    } else {
        res.status(401).send({ error: 'Product Not Found' });
    }
});
app.get("/search/:key", verifyToken, async (req, res) => {
    const result = await Product.find({
        $or: [
            { name: { $regex: req.params.key } },
        ]
    });
    if (result) {
        res.send(result);
    } else {
        res.status(401).send({ error: 'Product Not Found' });
    }
});

app.get("/product/:id", verifyToken, async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.status(401).send({ error: 'Product Not Found' });
    }
});

app.put("/product/:id", verifyToken, async (req, res) => {
    const result = await Product.updateOne({ _id: req.params.id }, req.body);
    if (result) {
        res.send({ message: 'Product Updated Successfully' });
    } else {
        res.status(401).send({ error: 'Product Not Found' });
    }

});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        Jwt.verify(bearerToken, jwtKey, (err, authData) => {
            if (err) {
                res.send({ "msg": "You are not authorized to view this page" });
            } else {
                next();
            }
        });
    } else {
        res.send({ "msg": "You are not authorized to view this page" });
    }
}
app.listen(5000);