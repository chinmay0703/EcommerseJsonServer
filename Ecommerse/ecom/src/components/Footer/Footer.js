import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Footer/Footer.css"
import 'boxicons/css/boxicons.min.css';
function Footer() {

    return (
        <div>



            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="footer-col">
                            <h4>company</h4>
                            <ul>
                                <li><a href="#">about us</a></li>
                                <li><a href="#">our services</a></li>
                                <li><a href="#">privacy policy</a></li>
                                <li><a href="#">affiliate program</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>get help</h4>
                            <ul>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">shipping</a></li>
                                <li><a href="#">returns</a></li>
                                <li><a href="#">order status</a></li>
                                <li><a href="#">payment options</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>online shop</h4>
                            <ul>
                                <li><a href="#">watch</a></li>
                                <li><a href="#">bag</a></li>
                                <li><a href="#">shoes</a></li>
                                <li><a href="#">dress</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>follow us</h4>
                            <div className="social-links">
                                <a href="https://www.facebook.com/login/web/?email=%2B918483038505&is_from_lara=1"><i className="bx bxl-facebook"></i></a>
                                <a href="#"><i className="bx bxl-twitter"></i></a>
                                <a href="#"><i className="bx bxl-instagram"></i></a>
                                <a href="https://www.linkedin.com/in/chinmay-vyawahare-0055b81b7/"><i className="bx bxl-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>



        </div>
    )
}

export default Footer;
