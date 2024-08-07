// server.js

const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Product = require('./models/Product'); // Убедитесь, что у вас есть модель продукта

const app = express();
const port = 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/yourdatabase', { useNewUrlParser: true, useUnifiedTopology: true });

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
app.post('/admin', upload.single('image'), async (req, res) => {
    const { name, description, price, brand, productCollection, collectionDescription, priceAndWeight, priceIn, list } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newProduct = new Product({
        name,
        description,
        price,
        brand,
        productCollection,
        collectionDescription,
        priceAndWeight,
        priceIn,
        list: list.split(','),
        imageUrl
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Эндпоинт для удаления продукта
app.delete('/admin/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.remove();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
