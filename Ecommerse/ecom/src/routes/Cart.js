import Navbar from "../components/Navbar";
import "../routes/Home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';
function Cart() {
    const activeItem = "cart";
    const setActiveItem = (itemName) => {
        console.log(`Setting active item to ${itemName}`);
    }
    const [userCart, setUserCart] = useState([]);
    const [usercartcount, setUserCartCount] = useState(0);
    const [usertotalAmount, setUserTotalAmount] = useState(0);
    const navigate = useNavigate()
    const [get, setget] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/get")
            .then((response) => response.json())
            .then((data) => setget(data));
    }, []);

    useEffect(() => {



        const userId = localStorage.getItem('UserId');
        const apiUrl = `http://localhost:3001/user/${userId}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((userData) => {
                const cart = userData.cart || [];
                setUserCart(cart);
                let cartCount = 0;
                let totalAmount = 0;
                cart.forEach((cartItem) => {
                    cartCount += cartItem.quantity || 0;
                    const itemTotal = (cartItem.quantity || 0) * (cartItem.amount || 0);
                    totalAmount += itemTotal;
                });
                setUserCartCount(cartCount);
                setUserTotalAmount(totalAmount);
                userData.cartCount = cartCount;
                userData.totalAmount = totalAmount;
                axios.put(apiUrl, userData)
                    .then((response) => {
                        console.log('Updated user data:', response.data);
                    })
                    .catch((error) => {
                        console.error('Error updating user information:', error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const deleteFromCart = (itemId) => {
        const authToken = localStorage.getItem('UserId');
        const apiUrl = `http://localhost:3001/user/${authToken}`;

        axios.get(apiUrl)
            .then((response) => {
                const userData = response.data;
                const userCart = userData.cart || [];

                const itemIndex = userCart.findIndex((cartItem) => cartItem.id === itemId);

                if (itemIndex !== -1) {
                    userCart.splice(itemIndex, 1);

                    let updatedTotalAmount = 0;
                    let updatedCartCount = 0;

                    userCart.forEach((cartItem) => {
                        const itemTotal = (cartItem.quantity || 0) * (cartItem.amount || 0);
                        updatedTotalAmount += itemTotal;
                        updatedCartCount += cartItem.quantity || 0;
                    });
                    setUserCart(userCart);
                    setUserTotalAmount(updatedTotalAmount);
                    setUserCartCount(updatedCartCount);
                    toast.error("item removed successfully");

                    axios.put(apiUrl, userData)
                        .then((response) => {
                            console.log('User data updated after deleting item:', response.data);
                        })
                        .catch((error) => {
                            console.error('Error updating user information:', error);
                        });
                } else {
                    console.log('Item not found in user\'s cart.');
                }
            })
            .catch((error) => {
                console.error('Error fetching user information:', error);
            });
    };

    const addQuantityToCart = (itemId) => {
        const authToken = localStorage.getItem('UserId');
        const apiUrl = `http://localhost:3001/user/${authToken}`;

        axios.get(apiUrl)
            .then((response) => {
                const userData = response.data;
                const userCart = userData.cart || [];

                const itemIndex = userCart.findIndex((cartItem) => cartItem.id === itemId);

                if (itemIndex !== -1) {
                    userCart[itemIndex].quantity += 1;

                    let updatedTotalAmount = 0;
                    let updatedCartCount = 0;

                    userCart.forEach((cartItem) => {
                        const itemTotal = (cartItem.quantity || 0) * (cartItem.amount || 0);
                        updatedTotalAmount += itemTotal;
                        updatedCartCount += cartItem.quantity || 0;
                    });

                    setUserCart(userCart);
                    setUserTotalAmount(updatedTotalAmount);
                    setUserCartCount(updatedCartCount);

                    axios.put(apiUrl, userData)
                        .then((response) => {
                            console.log('User data updated after adding quantity:', response.data);
                        })
                        .catch((error) => {
                            console.error('Error updating user information:', error);
                        });
                } else {
                    console.log('Item not found in user\'s cart.');
                }
            })
            .catch((error) => {
                console.error('Error fetching user information:', error);
            });
    };



    const removeQuantityFromCart = (itemId) => {
        const authToken = localStorage.getItem('UserId');
        const apiUrl = `http://localhost:3001/user/${authToken}`;

        axios.get(apiUrl)
            .then((response) => {
                const userData = response.data;
                const userCart = userData.cart || [];

                const itemIndex = userCart.findIndex((cartItem) => cartItem.id === itemId);

                if (itemIndex !== -1) {
                    if (userCart[itemIndex].quantity > 1) {
                        userCart[itemIndex].quantity -= 1;
                    } else {
                        userCart.splice(itemIndex, 1);
                    }

                    let updatedTotalAmount = 0;
                    let updatedCartCount = 0;

                    userCart.forEach((cartItem) => {
                        const itemTotal = (cartItem.quantity || 0) * (cartItem.amount || 0);
                        updatedTotalAmount += itemTotal;
                        updatedCartCount += cartItem.quantity || 0;
                    });

                    setUserCart(userCart);
                    setUserTotalAmount(updatedTotalAmount);
                    setUserCartCount(updatedCartCount);

                    axios.put(apiUrl, userData)
                        .then((response) => {
                            console.log('User data updated after removing quantity:', response.data);
                        })
                        .catch((error) => {
                            console.error('Error updating user information:', error);
                        });
                } else {
                    console.log('Item not found in user\'s cart.');
                }
            })
            .catch((error) => {
                console.error('Error fetching user information:', error);
            });


    };
    const [isConfettiActive, setIsConfettiActive] = useState(false);
    const startConfetti = () => {
        setIsConfettiActive(true);

        setTimeout(() => {
            setIsConfettiActive(false);

            navigate("/");
        }, 5000);
    }

    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem} cartCount={{ count: usercartcount }} />

            <div className="container py-5">
                <div className="row">
                    {usercartcount === 0 ? (
                        <h1>Your cart is empty</h1>
                    ) : (
                        <>
                            <div className="row">
                                <div className="col-6">
                                    <h4 className="text-end">Amount: {usertotalAmount} </h4>
                                </div>
                                <div className="col-6 text-start">
                                    <button className="btn btn-warning" onClick={startConfetti}>Checkout</button>
                                    {isConfettiActive && <Confetti />}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="row">
                    {userCart.map((cart) => (
                        <div key={cart.id} className="card col-md-3">
                            <img src={cart.photo} alt="img not found" />
                            <h5>{cart.title}</h5>
                            <p>{cart.quantity}</p>
                            <p>Amount: {cart.amount}</p>
                            <div className="justify-content-center">
                                <button className="btn btn-secondary me-md-2 mx-2" type="button" onClick={() => addQuantityToCart(cart.id)}>+</button>
                                <button className="btn btn-secondary" type="button" onClick={() => removeQuantityFromCart(cart.id)}>-</button>
                            </div>
                            <button
                                className="btn btn-danger my-2"
                                onClick={() => deleteFromCart(cart.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div class="container">
                <div class="row">
                    {get.map((get) => (
                        <div key={get.id} class="card col-md-3">
                            <img src={get.photo} alt="img not found" />
                            <h5>{get.title}</h5>
                            <p>{get.decsription}</p>
                            <p><b>Amount:</b>{get.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );

}
export default Cart;
