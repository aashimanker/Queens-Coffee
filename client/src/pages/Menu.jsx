import React, { useState, useEffect ,useRef, useCallback} from 'react'
import "../css/menu.css"
import axios from 'axios'
import Modal from './Modal'
import {debounce} from "lodash"


function Menu() {
  const [products,setProducts] = useState([])
  const [filteredProducts,setFilteredProducts] = useState([])
  const [category,setCategory] = useState("all")
  const [showModal,setShowModal] = useState(false)
  const [editMode,setEditMode] = useState(false)
  const [productToEdit, setProductToEdit] = useState(null);
  const [cartItems,setCartItems] = useState({})
  const [total,setTotal] = useState(0)
  const [isPayButtonDisabled, setIsPayButtonDisabled] = useState(false);
  const payButtonRef = useRef(false);



  const fetchItems = async()=>{
    const response = await axios.get(`http://localhost:5000/api/items/getItem`)
    setProducts(response.data.response)
    setFilteredProducts(response.data.response)
  }

  useEffect(()=>{
    if (category === "all"){
      setFilteredProducts(products)
    }
    else{
      setFilteredProducts(products.filter(product => product.category === category))
    }
  },[category,products])


  useEffect(()=>{
    fetchItems()
  },[])

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const handleCategoryChange = (newCategory)=>{
    setCategory(newCategory)
  }

  const handleShowModal = ()=>{
    setEditMode(false);
    setProductToEdit(null);
    setShowModal(true)
  }

  const handleCloseModal = () =>{
    setShowModal(false)
  }
  const handleAddProduct = async(product)=>{
    try {
      try {
        const response = await axios.post('http://localhost:5000/api/items/addItem',product);
        setProducts([...products, response.data]);
        handleCloseModal();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    } catch (error) {
      console.log("add product: ",error)
    }
  }
  const handleDeleteProduct = async(name)=>{
    try {
      await axios.delete(`http://localhost:5000/api/items/deleteItem/${name}`)
      fetchItems()
    } catch (error) {
      console.log("Error in delete product: ",error)
    }
  }

  const handleEditProduct = (product) => {
    setEditMode(true);
    setShowModal(true);
    setProductToEdit(product);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    console.log("Updating product with data:", updatedProduct); // Log the data
    try {
      await axios.put(`http://localhost:5000/api/items/updateItem/${updatedProduct.name}`, updatedProduct);
      fetchItems();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };
  
  const handlePlus = (name) => {
    setCartItems(prevItems => ({
      ...prevItems,
      [name]: (prevItems[name] || 0) + 1
    }));
    const product = products.find(product => product.name === name);
    if (product) {
      product.quantity = (product.quantity || 0) + 1;
      setProducts([...products]);
    }
    calculateTotal()
  };
  
  const handleMinus = (name) => {
    if (!cartItems) {
      console.error("cartItems is undefined");
      return;
    }
  
    if (!(name in cartItems)) {
      console.log(`${name} not found in cartItems`);
      alert("Product not in cart");
      return;
    }
  
    setCartItems(prevItems => {
      const newCount = prevItems[name] - 1;
      if (newCount <= 0) {
        const { [name]: _, ...updatedItems } = prevItems;
        return updatedItems;
      }
      calculateTotal()
      return {
        ...prevItems,
        [name]: newCount
      };
    });
    const product = products.find(product => product.name === name);
    if (product) {
      product.quantity = (product.quantity || 0) - 1;
      setProducts([...products]);
    }
  };
  const calculateTotal = async () => {
    let total = 0;
    try {
      const items = Object.keys(cartItems).map(name => ({
        name,
        price: products.find(product => product.name === name)?.price,
        quantity: cartItems[name],
      }));
      for (const item of items) {
        total += item.price * item.quantity;
      }
      setTotal(total);
    } catch (error) {
      console.error('Error calculating total:', error);
    }
  };
  const handleRemoveFromCart = (name) => {
    setCartItems(prevItems => {
      const { [name]: _, ...updatedItems } = prevItems;
      return updatedItems;
    });
  };

  const handlePay = async (event) => {
    event.stopPropagation();
    if (payButtonRef.current) return; // Prevent multiple submissions
    payButtonRef.current = true;
    setIsPayButtonDisabled(true);

    try {
      if (total > 0) {
        const items = Object.keys(cartItems).map(name => ({
          name,
          price: products.find(product => product.name === name)?.price,
          quantity: cartItems[name],
        }));
        const billId = Math.random().toString(36).slice(2, 11);

        const response = await axios.post('http://localhost:5000/api/orders/orderBill', {
          billId,
          items,
          billAmount: total,
        });

        if (response.data._id) {
          alert('Bill saved successfully!');
          setCartItems({});
          setTotal(0);
        } else {
          alert(response.data.msg);
        }
      } else {
        alert('No items in cart!');
      }
    } catch (error) {
      console.error('Error saving the bill:', error);
    } finally {
      setIsPayButtonDisabled(false);
      payButtonRef.current = false;
    }
  };
  

  return (
    <>
    <div className="container">
      <div className="menu">
        <h2>Menu</h2>
        <div className="filters">
          <button className="filter-button" onClick={()=>{handleCategoryChange("all")}}>All</button>
          <button className="filter-button" onClick={()=>{handleCategoryChange("coffee")}}>Coffee</button>
          <button className="filter-button" onClick={()=>handleCategoryChange("chillers")}>Chillers</button>
          <button className="filter-button" onClick={()=>{handleCategoryChange("tea")}}>Tea</button>
          <button className="filter-button" onClick={()=>{handleCategoryChange("milkshake")}}>Milkshake</button>
          <button className="filter-button" onClick={()=>{handleCategoryChange("dessert")}}>Dessert</button>
          <button className='filter-button' onClick={()=>{handleCategoryChange("snack")}}>Snack</button>
        </div>
        <div className="product-list">
            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  <div className='delete-product-button' onClick={()=>{handleDeleteProduct(product.name)}}>X</div>
                  <img src={product.image_url} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button className="edit-button" onClick={() => handleEditProduct(product)}>Edit</button>
                  <div className="quantity-control">
            <button onClick={() => { handleMinus(product.name) }}>-</button>
                <span  style={{ color: 'black', fontSize: '16px' }}>1</span>
            <button onClick={() => { handlePlus(product.name) }}>+</button>
            </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        <button className="add-product-button" onClick={handleShowModal}>Add Product</button>
      </div>
      {Object.keys(cartItems).length > 0 && (
          <div className="cart">
            <h3>Queens Coffee</h3>
            {Object.entries(cartItems).map(([itemName, quantity]) => (
              <div className="cart-item" key={itemName}>
                <span>{itemName}</span>
                <span>₹{(products.find(item => item.name === itemName)?.price * quantity).toFixed(2)}</span>
                <button className="remove-button" onClick={() => handleRemoveFromCart(itemName)}>X</button>
              </div>
            ))}
            <div className="total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button className="pay-button" id='pay-button' onClick={handlePay} disabled={isPayButtonDisabled} >Pay</button>
            <button className="print-bill-button">Print Bill</button>
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={editMode ? handleUpdateProduct : handleAddProduct}
        editMode={editMode}
        productToEdit={productToEdit}
      />
    </>
  )
}

export default Menu