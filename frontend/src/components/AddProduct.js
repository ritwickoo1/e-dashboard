import React from "react";

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    return (
        
        <div className="product">
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter Product Name" value={name} onChange={(e)=>setName(e.target.value)} className="inputBox" />
            <input type="text" placeholder="Enter Product Price" value={price} onChange={(e)=>setPrice(e.target.value)} className="inputBox"/>
            <input type="text" placeholder="Enter Product Category" value={category} onChange={(e)=>setCategory(e.target.value)} className="inputBox"/>
            <input type="text" placeholder="Enter Product Company" value={company} onChange={(e)=>setCompany(e.target.value)} className="inputBox"/>
            <button className="btn">Add Product</button>
        </div>
    );
};

export default AddProduct;