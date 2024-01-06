import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import "../routes/Product.css";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


function Products(props) {
    const authToken = localStorage.getItem('authToken');
    const [totalamount, settotalamount] = useState(0)
    const activeItem = "Products";
    const setActiveItem = (itemName) => {
        console.log(`Setting active item to ${itemName}`);
    };
    function addToCart(id, title, amount, photo, quantity) {
        const total = amount * quantity;
        settotalamount(total);
        const item = {
            id: id,
            title: title,
            amount: amount,
            photo: photo,
            quantity: quantity,
            totalamount: total,

        };
        console.log(totalamount);
        const userid = localStorage.getItem("UserId");
        axios.get(`http://localhost:3001/user/${userid}`)
            .then(userResponse => {
                const user = userResponse.data;

                const existingItem = user.cart.find(cartItem => cartItem.id === id);

                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    user.cart.push(item);
                }

                axios.put(`http://localhost:3001/user/${userid}`, user)
                    .then(response => {
                        console.log('Item added to cart and user updated:', response.data);
                    })
                    .catch(error => {
                        console.error('Error updating user and adding item to cart:', error);
                    });

                setcartCount(cartCount + 1);
                toast.success("Item added to the cart successfully");
            });
    }




    const handleAddToCart = (id, title, amount, photo, quantity) => {
        if (authToken) {
            addToCart(id, title, amount, photo, quantity);
        } else {
             window.location.href = '/login';
        }
    }

    const [get, setget] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/get")
            .then((response) => response.json())
            .then((data) => setget(data));
    }, []);


    const [cartCount, setcartCount] = useState(0);
    useEffect(() => {
        // Retrieve the user ID from localStorage
        const userId = localStorage.getItem('UserId');

        // Fetch the user based on their user ID
        fetch(`http://localhost:3001/user/${userId}`)
            .then((response) => response.json())
            .then((user) => {

                // Assuming that the user object contains a 'cart' property with an array of cart items
                const cartData = user.cart || [];

                let itemCount = 0;

                // Iterate through cartData using forEach
                cartData.forEach((item) => {
                    itemCount += item.quantity;
                });

                setcartCount(itemCount);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem} cartCount={{ count: cartCount }} />

            {authToken ? (
                <center> <h1 className="my-3">Welcome to Shopkaro</h1></center>

            ) : (

                <center><h1 className="my-3">Please Login To Buy</h1></center>
            )}

            <div class="container">
                <div class="row">
                    {get.map((get) => (
                        <div key={get.id} class="card col-md-3">
                            <img src={get.photo} alt="img not found" />
                            <h5>{get.title}</h5>
                            <p>{get.decsription}</p>
                            <p><b>Amount:</b>{get.amount}</p>
                            {authToken ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleAddToCart(get.id, get.title, get.amount, get.photo, get.quantity)}
                                >
                                    Add To Cart
                                </button>
                            ) : (
                                <Link to="/login" className="btn btn-primary">
                                    Add To Cart
                                </Link>
                            )}

                        </div>
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Products;
