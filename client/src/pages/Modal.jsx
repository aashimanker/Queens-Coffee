import React, { useState, useEffect } from 'react';
import "../css/modal.css";

const Modal = ({ show, handleCloseModal, handleSubmit, editMode, productToEdit }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image_url: ""
  });

  useEffect(() => {
    if (editMode && productToEdit) {
      setProduct(productToEdit);
    } else {
      setProduct({
        name: "",
        price: "",
        category: "",
        image_url: ""
      });
    }
  }, [editMode, productToEdit]);

  if (!show) {
    return null;
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(product);
    setProduct({
      name:"",
      price:"",
      category:"",
      image_url:""
    })
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editMode ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={onSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="product-name"
              id="name"
              required
              value={product.name}
              onChange={handleInput}
              autoComplete="off"
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              placeholder="product-price"
              required
              value={product.price}
              onChange={handleInput}
              autoComplete="off"
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              id="category"
              placeholder="product-category"
              required
              value={product.category}
              onChange={handleInput}
              autoComplete="off"
            />
          </label>
          <label>
            Image URL (Not required):
            <input
              type="text"
              name="image_url"
              id="image_url"
              placeholder="product-image-url"
              value={product.image_url}
              onChange={handleInput}
              autoComplete="off"
            />
          </label>
          <div className="modal-buttons">
            <button type="button" onClick={handleCloseModal}>Cancel</button>
            <button type="submit">{editMode ? "Update Product" : "Add Product"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
