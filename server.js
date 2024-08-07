// server.js

const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const cors = require("cors"); // Убедитесь, что у вас есть модель продукта

const app = express();
app.use(cors())
app.use('/uploads', express.static('uploads'));
const port = 8080;


// Подключение к MongoDB

const mongoURI = 'mongodb://0.0.0.0:27017/admin';

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });

// Настройка Multer для загрузки файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Эндпоинт для получения всех продуктов
app.get('/admin', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Эндпоинт для добавления нового продукта
app.post('/admin', upload.array('images'), async (req, res) => {
    const {  cakeName, slug, category, details } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);

    const newProduct = new Product({
        cakeName,
        slug,
        category,
        images,
        details: {
            price: details.price,
            description: details.description.split(','),
        }
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Endpoint to delete a product
app.delete('/admin/:id', async (req, res) => {
    try {
        const product = await Product.deleteOne({_id: req.params.id});
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Endpoint to get a cake by slug
app.get('/admin/cakes/:slug', async (req, res) => {
    try {
        const cake = await Product.findOne({ slug: req.params.slug });
        if (!cake) {
            return res.status(404).json({ message: 'Cake not found' });
        }
        res.json(cake);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
