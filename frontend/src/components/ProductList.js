import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
    const [products, setProducts] = React.useState([]);
    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products",{
            headers:{
                authorization: localStorage.getItem("token")
            }
        });
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async (id) => {
        console.warn(id);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE'
        });
        result = await result.json();
        if (result) {
            getProducts();
        }

    }
    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result)
                setProducts(result);
        } else
            getProducts();
    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="text" placeholder="Search Product" className="search-product-box"
                onChange={searchHandle} />
            <ul>
                <li>S. No</li>
                <li>Product Name</li>
                <li>Product Price</li>
                <li>Product Category</li>
                <li>Product Company</li>
                <li>Operation</li>
            </ul>
            {
                products.map((item, index) => (
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`}><button>Update</button></Link>
                        </li>
                    </ul>
                ))
            }
        </div>
    );
};
export default ProductList;