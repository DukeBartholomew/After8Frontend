import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { LandingNav } from "./navbar";
import { Card, Container, Input, Button, PasswordInput } from "@mantine/core";
import axios from "axios";
import "../css/buttonHover.css";
import { useNavigate } from "react-router-dom";



const Landing = () => {
  const url = process.env.REACT_APP_URL;

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const { isAuthenticated, setIsAuthenticated: handleSetIsAuthenticated } = useContext(AuthContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (username && password) {
      const requestData = {
        _username: username,
        _password: password,
      };
  
      setLoading(true);
  
      axios
        .post(url + '/users/grant-access', requestData)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.message === 'Access granted') {
              console.log('Access granted');
              // handleSetIsAuthenticated(true);
              navigate('/clothing');
            } else {
              console.log('Access denied');
              window.alert('Incorrect Username or Password');
              setLoading(false); // Reset loading state to false
            }
          } else {
            console.log('Error occurred');
            window.alert('Error occurred');
            setLoading(false); // Reset loading state to false
          }
        })
        .catch((err) => {
          console.log(err);
          window.alert('Error occurred');
          setLoading(false); // Reset loading state to false
        });
    } else {
      console.log('Username or password is empty');
      window.alert('Please enter both username and password');
    }
  };
  

  const [visible, { toggle }] = useDisclosure(false);

  return (
    <>
      <LandingNav />
      <Container style={{ marginTop: "100px" }}>
        <Card
          shadow="lg"
          padding="lg"
          radius="md"
          withBorder
          className="login-card"
          // style={{ width: "80%" }}
        >
          <form action="login.php" method="POST">
            <h1 style={{ fontSize: "40px" }}>Enter Information For Access</h1>
            <div style={{ textAlign: "left" }}>
              <label style={{ fontWeight: "bold", fontSize: "20px" }}>
                Username
              </label>
            </div>
            <Input
              placeholder="Enter Username"
              radius="md"
              size="md"
              required
              onChange={handleUsernameChange}
            />
            <br></br>
            <div style={{ textAlign: "left" }}>
              <label style={{ fontWeight: "bold", fontSize: "20px" }}>
                Password
              </label>
            </div>
            <PasswordInput
              placeholder="Enter Password"
              radius="md"
              size="md"
              visible={visible}
              onVisibilityChange={toggle}
              onChange={handlePasswordChange}
            />
            {loading && <p>Loading...</p>}
            <Button
              type="submit"
              size="lg"
              className="add-button"
              style={{ width: "200px", marginTop: "30px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            {/* <div>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div> */}
          </form>
        </Card>
      </Container>
    </>
  );
};

export default Landing;
