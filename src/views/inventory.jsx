import React, { useEffect, useState } from "react";
import { HeaderMegaMenu } from "./navbar.jsx";
import { Button, Table } from "@mantine/core";
import axios from "axios";
import DisplayItems from "../components/displayItems.jsx";
import '../css/buttonHover.css';

const Inventory = () => {
  const url = process.env.REACT_APP_URL;
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [sortBy, setSortBy] = useState("item_name"); // Default sort by item name

  const getItems = () => {
    axios
      .get(url + "/items")
      .then((res) => {
        let sortedItems = [...res.data];
        if (sortBy === "-item_name") {
          sortedItems.sort((a, b) => b.item_name.localeCompare(a.item_name));
        } else if (sortBy === "quantity") {
          sortedItems.sort((a, b) => a.quantity - b.quantity);
        } else if (sortBy === "-quantity") {
          sortedItems.sort((a, b) => b.quantity - a.quantity);
        } else if (sortBy === "item_name") {
          sortedItems.sort((a, b) => a.item_name.localeCompare(b.item_name));
        }
        setItems(sortedItems);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, [sortBy]);

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSubmit = () => {
    if (itemName && quantity) {
      // Extract the numeric part from the quantity input using a regular expression
      const numericQuantity = quantity.match(/\d+/);
  
      if (!numericQuantity || isNaN(parseInt(numericQuantity[0], 10))) {
        // Show a prompt to the user if the numeric part is not an integer
        alert("Please enter a valid integer value for quantity.");
        return; // Exit the function, don't proceed with the submission
      }
  
      const parsedQuantity = parseInt(numericQuantity[0], 10);
  
      const requestData = {
        item_name: itemName,
        quantity: parsedQuantity,
        notes: notes,
      };
  
      axios
        .post(url + "/items", requestData)
        .then((res) => {
          console.log(res);
          // Clear input fields after successful submission
          setItemName("");
          setQuantity("");
          setNotes("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  

  return (
    <>
      <HeaderMegaMenu />
      <h1 style={{ fontWeight: "bolder", fontSize: "40px"}}>Miscellaneous Items</h1>

      <form style={{ border: "5px" }}>
        <div className="create-item">
          <label style={{ fontSize: "25px", color: "red" }}>*</label>
          <label htmlFor="item_name" style={{ fontWeight: "bold" }}>
            Item Name:{" "}
          </label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            required
            value={itemName}
            onChange={handleItemNameChange}
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

          <br></br>
          <label htmlFor="notes" style={{ fontWeight: "bold" }}>
            Notes:{" "}
          </label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={notes}
            onChange={handleNotesChange}
            style={{
              marginTop: "10px",
              width: "80%",
              borderRadius: "5px",
              borderWidth: "1.2px",
            }}
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
      <div>
        <label style={{ fontWeight: "bold" }}>Sort By: </label>
        <select
          value={sortBy}
          onChange={handleSortByChange}
          style={{ marginBottom: "10px" }}
        >
          <option value="item_name">Item Name (A to Z)</option>
          <option value="-item_name">Item Name (Z to A)</option>
          <option value="quantity">Quantity (Least to Greatest)</option>
          <option value="-quantity">Quantity (Greatest to Least)</option>
        </select>
      </div>
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
          style={{borderWidth:"1.5px", borderColor:"darkGray"}}
        >
          <thead>
            <tr>
              <th>
                <h2 style={{ textAlign: "center", color:"black" }}>Item Name</h2>
              </th>
              <th>
                <h2 style={{ textAlign: "center", color:"black"  }}>Quantity</h2>
              </th>
              <th>
                <h2 style={{ textAlign: "center", color:"black"  }}>Notes</h2>
              </th>
              <th>
                <h2 style={{ textAlign: "center", color:"black"  }}>Edit</h2>
              </th>
            </tr>
          </thead>
          <DisplayItems items={items} />
        </Table>
      </div>
    </>
  );
};

export default Inventory;
