import React from "react";

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState('');
    const addProduct = async () => {
        if(!name || !price || !category || !company) {
            setError(true);
            return false;

        }
        console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch("http://localhost:5000/add-Product", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ name, price, category, company, userId }),
        });
        result = await result.json();
        console.warn("result", result);
    }
    return (
        
        <div className="product">
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter Product Name" value={name} onChange={(e)=>setName(e.target.value)} className="inputBox" />
            {error && !name && <span className="invalid-input"> Please enter valid product name</span>}
            <input type="text" placeholder="Enter Product Price" value={price} onChange={(e)=>setPrice(e.target.value)} className="inputBox"/>
            {error && !price && <span className="invalid-input"> Please enter valid price</span>}
            <input type="text" placeholder="Enter Product Category" value={category} onChange={(e)=>setCategory(e.target.value)} className="inputBox"/>
            {error && !category && <span className="invalid-input"> Please enter valid category name</span>}
            <input type="text" placeholder="Enter Product Company" value={company} onChange={(e)=>setCompany(e.target.value)} className="inputBox"/>
            {error && !company && <span className="invalid-input"> Please enter valid company name</span>}
            <button onClick={addProduct} className="btn">Add Product</button>
        </div>
    );
};

export default AddProduct;