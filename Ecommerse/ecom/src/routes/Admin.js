import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import "../routes/Home.css";
import tt from "../Images/ty.jpeg"
import uu from "../Images/yu.jpeg"
import Footer from "../components/Footer/Footer";
import axios from "axios";
function Admin() {
    const [users, setUsers] = useState([]);
    const activeItem = "Home";
    const [deletedUserId, setDeletedUserId] = useState(null);
    const setActiveItem = (itemName) => {

        console.log(`Setting active item to ${itemName}`);
    };
    useEffect(() => {
        // Make an HTTP GET request to fetch the user data
        axios.get('http://localhost:3001/user')
          .then((response) => {
            setUsers(response.data); // Update the state with the fetched data
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }, []);

    
      const deleteUser = (id) => {
        axios.delete(`http://localhost:3001/user/${id}`)
          .then(() => {
            // Remove the deleted user from the state
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            setDeletedUserId(id);
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          });
      };

    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem}  />
            <div className="container">
                
            </div>
            <center><b><h1 className="my-3">Welcome Admin</h1></b></center>
            <div className="container">
            <button className="btn btn-primary my-3"><h5>Users List</h5></button>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td> <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)} // Pass user.id as an argument
                >
                  Delete
                </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {deletedUserId && <p>User with ID {deletedUserId} has been deleted.</p>}
            
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

export default Admin;
