import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import "../routes/Home.css";
import pic from "../Images/99.png"
import picc from "../Images/00.jpg"
import piccc from "../Images/45.jpeg"
import tt from "../Images/ty.jpeg"
import uu from "../Images/yu.jpeg"
import Footer from "../components/Footer/Footer";
// import { useLocation } from 'react-router-dom';
function Home() {

    const activeItem = "Home";

    const setActiveItem = (itemName) => {

        console.log(`Setting active item to ${itemName}`);
    };


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
            <div className="container">
                <div id="carouselExampleControlsNoTouching" className="carousel slide py-2" data-bs-touch="false" data-bs-interval="false">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="img " src={piccc} alt="d" />
                        </div>
                        <div className="carousel-item">
                            <img src={pic} className="d-block w-100" alt="d" />
                        </div>
                        <div className="carousel-item">
                            <img src={picc} className="d-block w-100" alt="d" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <center><b><h1 className="my-5">Shop smarter, not harder......</h1></b></center>
            <div className="container">
            
                <div className="row my-5">
                    
                    <div className="col-6 ttt">
                        <img src={tt} alt="d"></img>
                    </div>
                    <div className="col-6 ttt">
                        <img src={uu} alt="d"></img>
                    </div>
                </div>

            </div>

            <Footer></Footer>
        </div>
    );
}

export default Home;
