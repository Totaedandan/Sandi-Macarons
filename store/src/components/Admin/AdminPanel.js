import React, { useEffect, useState } from 'react';
import './style.scss'; // Assuming you have a corresponding stylesheet
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext';
import { FaEye } from 'react-icons/fa';

function Admin() {
    const [selectedOption, setSelectedOption] = useState("allProducts");
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState();
    const [file, setFile] = useState(null);
    const [collection, setCollection] = useState('');
    const [collectionDescription, setCollectionDescription] = useState('');
    const [priceAndWeight, setPriceAndWeight] = useState(false);
    const [priceIn, setPriceIn] = useState("KZT");
    const [list, setList] = useState([]);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const {user, setUser, handleLogin} = useAuth();
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const postData = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/admin', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Product added:', response.data);
            handleOptionChange("allProducts");
            await fetchProducts();
        } catch (error) {
            console.log('Error adding product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:3000/admin/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const renderAllProducts = () => {
        return (
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product._id}>
                        <img src={`${product.imageUrl}`} alt={product.name} />
                        <h3>{product.name}</h3>
                        <div className="actions">
                            <button onClick={() => handleDelete(product._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderAddProduct = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('image', file);
            formData.append('brand', brand);
            formData.append('productCollection', collection);
            formData.append('collectionDescription', collectionDescription);
            formData.append('priceAndWeight', priceAndWeight);
            formData.append('priceIn', priceIn);
            formData.append('list', list.join(',')); // Join list items with comma

            postData(formData);
        };

        return (
            <form
                className="add-product-form"
                onSubmit={handleSubmit}
            >
                <div>
                    <label>Название коллекция:</label>
                    <input 
                        type="text" 
                        name="collection"
                        value={collection}
                        onChange={e => setCollection(e.target.value)}
                    />
                </div>
                <div>
                    <label>Описание коллекции:</label>
                    <textarea 
                        name="description"
                        value={collectionDescription}
                        onChange={e => setCollectionDescription(e.target.value)}
                    ></textarea>
                </div>
                <hr />
                <div>
                    <label>Название:</label>
                    <input 
                        type="text" 
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Название бренда:</label>
                    <input 
                        type="text" 
                        name="brand"
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                    />
                </div>
                <div>
                    <label>Описание товара:</label>
                    <textarea 
                        name="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <hr />
                <div>
                    <label>Цена:</label>
                    <input 
                        type="number" 
                        name="price" 
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>Считать вес</label>
                    <input 
                        type="checkbox" 
                        name="priceAndWeight" 
                        checked={priceAndWeight}
                        onChange={e => setPriceAndWeight(e.target.checked)}
                    />
                </div>
                <div>
                    <label>Цена в (USD/KZT)</label>
                    <input 
                        type="text" 
                        name="priceIn" 
                        value={priceIn}
                        onChange={e => setPriceIn(e.target.value)}
                    />
                </div>
                <hr />
                <div>
                    <label>Фотография товара:</label>
                    <input 
                        type="file" 
                        name="image" 
                        onChange={e => setFile(e.target.files[0])}
                    />
                </div>
                {loading ? <p>Loading...</p> : <button type="submit">Сохранить</button>}
            </form>
        );
    };

    if (user === null) {
        return (
            <div className="admin-page-login">
                <div className="login-window">
                    <div>
                        <label>Логин</label>
                        <div>
                            <input 
                                type="text"
                                value={userLogin}
                                onChange={(e) => setUserLogin(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div>
                        <label>Пароль</label>
                        <div>
                            <input 
                                type={`${!showPassword ? 'password' : 'text'}`}
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                            <FaEye onClick={(e) => setShowPassword(prev => !prev)}/>
                        </div>
                    </div>
                    <div className="actions">
                        <button
                            onClick={e => {
                                handleLogin(userLogin, userPassword);
                            }}
                        >Войти</button>
                    </div>
                </div>
            </div>
        )
    }    

    return (
        <div className="admin-page">
            <aside className="sidebar">
                <ul>
                    <li onClick={() => { navigate('/') }}>
                        Домой
                    </li>
                    <li onClick={() => handleOptionChange("allProducts")}>
                        Все продукты
                    </li>
                    <li onClick={() => handleOptionChange("addProduct")}>
                        Добавить продукт
                    </li>
                </ul>
            </aside>
            <main className="main-section">
                {selectedOption === "allProducts" && renderAllProducts()}
                {selectedOption === "addProduct" && renderAddProduct()}
            </main>
        </div>
    );
}

export default Admin;
