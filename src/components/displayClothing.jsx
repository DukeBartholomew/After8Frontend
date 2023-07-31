import React from "react";
import { Button } from "@mantine/core";
import axios from "axios";

const DisplayClothing = (props) => {
  const url = process.env.REACT_APP_URL;

  const handleDelete = (clothing_id) => {
    if (window.confirm("Are you sure you want to delete this clothing item?")) {
      axios
        .delete(url + "/clothing/" + clothing_id)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEdit = (clothing_id, quantity) => {
    const newQuantityAmount = prompt(
      "Please enter the new quantity: ",
      quantity
    );
    if (newQuantityAmount) {
      axios
        .put(url + "/clothing/" + clothing_id, {
          quantity: newQuantityAmount,
        })
        .then((res) => {
          console.log("Quantity Succesfully Updated");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const display = (props) => {
    const { clothes } = props;

    if (!clothes || clothes.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan="3">
              <h1>No Clothing In Inventory</h1>
            </td>
          </tr>
        </tbody>
      );
    }

    console.log(clothes);

    const sortedClothes = [...props.clothes].sort((a, b) =>
      a.article.localeCompare(b.article)
    );
    
    if (clothes.length > 0) {
      const rows = sortedClothes.map((clothe) => (
        <tr key={clothe.clothing_id}>
          <td>
            <h3 style={{ wordWrap: "break-word" }}>{clothe.article}</h3>
          </td>
          <td>
            <h3>{clothe.quantity}</h3>
          </td>
          <td>
            <Button
              className="edit-button"
              onClick={() => {
                handleEdit(clothe.clothing_id, clothe.quantity);
              }}
            >
              Edit
            </Button>
            <Button
              className="delete-button"
              onClick={() => handleDelete(clothe.clothing_id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      ));
      return (
        <>
          <tbody>{rows}</tbody>
        </>
      );
    }
  };

  return <>{display(props)}</>;
};

export default DisplayClothing;
