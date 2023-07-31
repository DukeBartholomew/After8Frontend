import React, { useEffect, useState } from "react";
import { HeaderMegaMenu } from "./navbar";
import { Table, Button } from "@mantine/core";
import DisplayClothing from "../components/displayClothing.jsx";
import axios from "axios";

const Clothing = () => {

  const url = process.env.REACT_APP_URL;
  const [clothes, setClothes] = useState([]);
  const [article, setArticle] = useState("");
  const [quantity, setQuantity] = useState("");
  // const [sortBy, setSortBy] = useState("article"); // Default sort by clothing article


  const getClothes = () => {
    let allClothes = [];
    axios
      .get(url + "/clothing")
      .then((res) => {
        allClothes = res.data;
        setClothes(allClothes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    if (article && quantity) {
      // Check if required fields are not empty
      const numericQuantity = quantity.match(/\d+/);
  
      if (!numericQuantity || isNaN(parseInt(numericQuantity[0], 10))) {
        // Show a prompt to the user if the numeric part is not an integer
        alert("Please enter a valid integer value for quantity.");
        return; // Exit the function, don't proceed with the submission
      }
  
      const parsedQuantity = parseInt(numericQuantity[0], 10);

      const requestData = {
        article: article,
        quantity: parsedQuantity,
      };

      axios
        .post(url + "/clothing", requestData)
        .then((res) => {
          console.log(res);
          // Clear input fields after successful submission
          setArticle("");
          setQuantity("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getClothes();
  },[]);

  const handleArticleChange = (event) => {
    setArticle(event.target.value);
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  }

  // const handleSortByChange = (event) => {
  //   setSortBy(event.target.value);
  // };

  return (
    <>
      <HeaderMegaMenu />
      <h1 style={{ fontWeight: "bolder", fontSize: "40px" }}>Clothing</h1>
      <form style={{ border: "5px" }}>
        <div className="create-item">
          <label style={{ fontSize: "25px", color: "red" }}>*</label>
          <label htmlFor="article" style={{ fontWeight: "bold" }}>
            Item Name:{" "}
          </label>
          <input
            type="text"
            id="article"
            name="article"
            required
            value={article}
            onChange={handleArticleChange}
            style={{
              width: "40%",
              marginBottom: "10px",
              borderRadius: "5px",
              borderWidth: "1.2px",
            }}
          />
          <label style={{ fontSize: "25px", color: "red" }}> *</label>
          <label htmlFor="quantity" style={{ fontWeight: "bold" }}>
            Quantity:{" "}
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            required
            value={quantity}
            onChange={handleQuantityChange}
            style={{ width: "10%", borderRadius: "5px", borderWidth: "1.2px" }}
          />
        </div>
        <Button
          type="submit"
          className="add-button"
          onClick={() => handleSubmit()}
        >
          Add New Item
        </Button>
      </form>
      {/* <div>
        <label style={{ fontWeight: "bold" }}>Sort By: </label>
        <select
          value={sortBy}
          onChange={handleSortByChange}
          style={{ marginBottom: "10px" }}
        >
          <option value="article">Item Name (A to Z)</option>
          <option value="-article">Item Name (Z to A)</option>
          <option value="quantity">Quantity (Least to Greatest)</option>
          <option value="-quantity">Quantity (Greatest to Least)</option>
        </select>
      </div> */}
      <div
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
      <Table
        horizontalSpacing="x1"
        verticalSpacing="lg"
        fontSize="sm"
        striped
        highlightOnHover
        withBorder
        withColumnBorders
        className="table"
        style={{ borderWidth: "1.5px", borderColor: "darkGray" }}
      >
        <thead>
          <tr>
            <th>
              <h2 style={{ textAlign: "center", color: "black" }}>
                Article of Clothing
              </h2>
            </th>
            <th>
              <h2 style={{ textAlign: "center", color: "black" }}>Quantity</h2>
            </th>
            <th>
              <h2 style={{ textAlign: "center", color: "black" }}>Edit</h2>
            </th>
          </tr>
        </thead>
        <DisplayClothing clothes={clothes} />
      </Table>
      </div>
    </>
  );
};

export default Clothing;
