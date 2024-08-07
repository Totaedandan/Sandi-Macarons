import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext';
import { FaEye } from 'react-icons/fa';
import './style.scss'; // Assuming you have a corresponding stylesheet

function Admin() {
    const [selectedOption, setSelectedOption] = useState("allProducts");
    const navigate = useNavigate();

    const [cakeName, setCakeName] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([""]);
    const [details, setDetails] = useState({
        price: 0,
        description: [""]
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, setUser, handleLogin } = useAuth();
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const {data} = await axios.get('http://localhost:8080/admin');
            setProducts(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddDescription = () => {
        setDetails({ ...details, description: [...details.description, ""] });
    };

    const handleRemoveDescription = (index) => {
        const newDescriptions = details.description.filter((_, i) => i !== index);
        setDetails({ ...details, description: newDescriptions });
    };

    const handleDescriptionChange = (value, index) => {
        const newDescriptions = details.description.map((desc, i) => (i === index ? value : desc));
        setDetails({ ...details, description: newDescriptions });
    };

    const handleAddImage = () => {
        setImages([...images, null]);
    };

    const handleRemoveImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleImageChange = (file, index) => {
        const newImages = images.map((image, i) => (i === index ? file : image));
        setImages(newImages);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const postData = async (formData) => {
        setLoading(true);
        try {
            const {data} = await axios.post('http://localhost:8080/admin', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Product added:', data);
            handleOptionChange("allProducts");
            await fetchProducts();
        } catch (error) {
            console.log('Error adding product:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/admin/${id}`);
            console.log('Product deleted');
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            fetchProducts()
        }
    };


    const renderAllProducts = () => {
        return (
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product._id}>
                        {product.images.map((image, index) => (
                            <img key={index} src={`http://localhost:8080${image}`} alt={product.cakeName} />
                        ))}
                        <h3>{product.cakeName}</h3>
                        <p>Slug: {product.slug}</p>
                        <p>Category: {product.category}</p>
                        <div className="actions">
                            <button onClick={() => deleteProduct(product._id)}>Delete</button>
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
            formData.append('cakeName', cakeName);
            formData.append('slug', slug);
            formData.append('category', category);
            images.forEach((image) => {
                if (image) {
                    formData.append('images', image);
                }
            });
            formData.append('details[price]', details.price);
            formData.append('details[description]', details.description.join(','));

            postData(formData);
        };

        return (
            <form
                className="add-product-form"
                onSubmit={handleSubmit}
            >
                <div>
                    <label>Cake Name:</label>
                    <input
                        type="text"
                        name="cakeName"
                        value={cakeName}
                        onChange={e => setCakeName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Slug:</label>
                    <input
                        type="text"
                        name="slug"
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        name="category"
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option disabled={true}>Выбрать</option>
                        <option value="Макаронсы">Макаронсы</option>
                        <option value="Сеты">Сеты</option>
                        <option value="Ещё">Ещё</option>
                    </select>
                </div>
                <div>
                    <div className="description-column">
                    <label>Images:</label>
                    <button type="button" onClick={handleAddImage}>Add Image</button>
                    </div>
                    <div className="description-column">
                    {images.map((image, index) => (
                        <div key={index} className="description-row">
                            <input
                                type="file"
                                onChange={e => handleImageChange(e.target.files[0], index)}
                            />
                            <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
                        </div>
                    ))}
                    </div>
                </div>

                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="details[price]"
                        value={details.price}
                        onChange={e => setDetails({ ...details, price: e.target.value })}
                    />
                </div>
                <div>
                    <div className="description-column">
                    <label>Description:</label>
                    <button type="button" onClick={handleAddDescription}>Add Description</button>
                    </div>
                    <div className="description-column">
                    {details.description.map((desc, index) => (
                        <div key={index} className="description-row">
                            <textarea
                                name="details[description]"
                                value={desc}
                                onChange={e => handleDescriptionChange(e.target.value, index)}
                            ></textarea>
                            <button type="button" onClick={() => handleRemoveDescription(index)}>Remove</button>
                        </div>
                    ))}
                    </div>
                </div>
                {loading ? <p>Loading...</p> : <button type="submit">Save</button>}
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
