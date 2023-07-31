import { Button } from "@mantine/core";
import React from "react";
import axios from "axios";
import '../css/buttonHover.css';


const DisplayLaptops = (props) => {
  const url = process.env.REACT_APP_URL;

  const handleEdit = (laptop_number, status, notes) => {
    const newStatus = prompt("Please enter the new status: ", status);
    if (newStatus) {
      const newNotes = prompt("Type to edit notes. Otherwise, click OK", notes);
      axios
        .put(url + "/laptops/" + laptop_number, {
          status: newStatus,
          notes: newNotes,
        })
        .then((res) => {
          console.log("Quantity Succesfully Updated");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else if (newStatus === "") {
      const newNotes = prompt("Type to edit notes. Otherwise, click OK", notes);
      axios
        .put(url + "/laptops/" + laptop_number, {
          status: "",
          notes: newNotes,
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

  const handleDelete = (laptop_number) => {
    if (window.confirm("Are you sure you want to delete this laptop?")) {
      axios
        .delete(url + "/laptops/" + laptop_number)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const display = (props) => {
    const { laptops } = props;
    console.log(laptops);
    if (laptops.length > 0) {
        const sortedLaptops = laptops.sort((a, b) => {
            const laptopNumberA = parseInt(a.laptop_number);
            const laptopNumberB = parseInt(b.laptop_number);
            return laptopNumberA - laptopNumberB;
          });

      const rows = sortedLaptops.map((laptop) => (
        <tr key={laptop.laptop_number}>
          <td>
            <h4>
              {laptop.laptop_number} / {laptop.serial_number}
            </h4>
          </td>
          <td>
            <h4>{laptop.model}</h4>
          </td>
          <td>
            <h4>{laptop.status}</h4>
          </td>
          <td>
            <h4 style={{wordWrap:"breakWord"}}>{laptop.notes}</h4>
          </td>
          <td>
            <Button
              className="edit-button"
              onClick={() =>
                handleEdit(laptop.laptop_number, laptop.status, laptop.notes)
              }
            >
              Edit
            </Button>
            <Button
              className="delete-button"
              onClick={() => handleDelete(laptop.laptop_number)}
            >
              Delete
            </Button>
          </td>
        </tr>
      ));
      return <tbody>{rows}</tbody>;
    } else {
      return (
        <tbody>
          <tr>
            <td colSpan="5">
              <h1>No Laptops In Inventory</h1>
            </td>
          </tr>
        </tbody>
      );
    }
  };
  return <>{display(props)}</>;
};

export default DisplayLaptops;
