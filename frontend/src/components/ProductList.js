import React, { useEffect } from "react";
const ProductList = () => {
    const [products, setProducts] = React.useState([]);
    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);
    }
    console.warn(products);
    return (
        <div className="product-list">
            <h3>Product List</h3>
            <ul>
                <li>S. No</li>
                <li>Product Name</li>
                <li>Product Price</li>
                <li>Product Category</li>
                <li>Product Company</li>
            </ul>
            {
                products.map((item, index) => (
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                    </ul>
                ))
            }
        </div>
    );
};
export default ProductList;