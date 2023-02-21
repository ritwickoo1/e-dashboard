import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const Navigate = useNavigate();
    useEffect(() => {
        console.warn(params);
        getProductDetails();
    }, []);
    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method: 'GET'
        })
        result = await result.json();
        console.warn(result); 
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {
        console.warn(name, price, category, company);
        let item = { name, price, category, company };
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        Navigate('/');
        console.warn(result);
    }
    return (
        
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter Product Name" value={name} onChange={(e)=>setName(e.target.value)} className="inputBox" />
            <input type="text" placeholder="Enter Product Price" value={price} onChange={(e)=>setPrice(e.target.value)} className="inputBox"/>
            <input type="text" placeholder="Enter Product Category" value={category} onChange={(e)=>setCategory(e.target.value)} className="inputBox"/>
            <input type="text" placeholder="Enter Product Company" value={company} onChange={(e)=>setCompany(e.target.value)} className="inputBox"/>
            <button onClick={updateProduct} className="btn">Update Product</button>
        </div>
    );
};

export default UpdateProduct;