import React from "react";
import { Button } from "@mantine/core";
import axios from "axios";
import '../css/buttonHover.css';


const DisplayHeadphones = (props) => {
  const url = process.env.REACT_APP_URL;

  const handleEdit = (headphone_number, notes) => {
    const newNotes = prompt("Please enter new notes: ", notes);
    if (newNotes) {
      axios
        .put(url + "/headphones/" + headphone_number, {
          notes: newNotes,
        })
        .then((res) => {
          console.log("Notes Succesfully Updated");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (newNotes===""){
      axios
        .put(url + "/headphones/" + headphone_number, {
          notes: " ",
        })
        .then((res) => {
          console.log("Notes Succesfully Updated");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (headphone_number) => {
    if (window.confirm("Are you sure you want to delete this headphone?")) {
      axios
        .delete(url + "/headphones/" + headphone_number)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCheckboxChange = (event, headphone) => {
    const updatedHeadphone = { ...headphone, two_cords: event.target.checked };

    axios
      .put(url + "/headphones/cords/" + headphone.headphone_number, updatedHeadphone)
      .then((res) => {
        console.log("Checkbox Successfully Updated");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const display = (props) => {
    const { headphones } = props;
    console.log(headphones);
    if (headphones.length > 0) {
      const sortedHeadphones = headphones.sort((a, b) => {
        const headphoneNumberA = parseInt(a.headphone_number);
        const headphoneNumberB = parseInt(b.headphone_number);
        return headphoneNumberA - headphoneNumberB;
      });

      const rows = sortedHeadphones.map((headphone) => (
        <tr key={headphone.headphone_number}>
          <td>
            <h3>
              {headphone.headphone_number} / {headphone.serial_number}
            </h3>
          </td>
          <td>
          <input
              type="checkbox"
              checked={headphone.two_cords}
              onChange={(event) => handleCheckboxChange(event, headphone)}
            />
          </td>
          <td>
            <h4>{headphone.notes}</h4>
          </td>
          <td>
            <Button
              className="edit-button"
              onClick={() =>
                handleEdit(headphone.headphone_number, headphone.notes)
              }
            >
              Edit
            </Button>
            <Button
              className="delete-button"
              onClick={() => handleDelete(headphone.headphone_number)}
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
            <td colSpan="4">
              <h1>No Headphones In Inventory</h1>
            </td>
          </tr>
        </tbody>
      );
    }
  };

  return <>{display(props)}</>;
};

export default DisplayHeadphones;
