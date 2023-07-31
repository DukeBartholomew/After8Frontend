import React, { useState, useEffect } from "react";
import { HeaderMegaMenu } from "./navbar";
import { Table, Button } from "@mantine/core";
import axios from "axios";
import DisplayAnnouncements from "../components/displayAnnouncements";
import "../css/buttonHover.css";

const Announcements = () => {
  const url = process.env.REACT_APP_URL;

  const [topic, setTopic] = useState("");
  const [situation, setSituation] = useState("");
  const [endResult, setEndResult] = useState("");
  const [sortBy, setSortBy] = useState("topic"); // Default sort by food name


  const getAnnouncements = () => {
    axios
      .get(url + "/announcements")
      .then((res) => {
        let sortedItems = [...res.data];
        console.log("Sorted items: ", sortedItems);
        console.log("Sort By: ", sortBy);
        if (sortBy === "-topic") {
          sortedItems.sort((a, b) => b.topic.localeCompare(a.topic));
        } else if (sortBy === "situation") {
          sortedItems.sort((a, b) => a.situation - b.situation);
        } else if (sortBy === "-situation") {
          sortedItems.sort((a, b) => b.situation - a.situation);
        } else if (sortBy === "topic") {
          sortedItems.sort((a, b) => a.topic.localeCompare(b.topic));
        }
        setAnnouncements(sortedItems);
        console.log("Announcements:", sortedItems)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    getAnnouncements();
  }, [sortBy]);

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleSituationChange = (event) => {
    setSituation(event.target.value);
  };

  const handleNotesChange = (event) => {
    setEndResult(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSubmit = () => {
    if (topic && situation) {
      const numericQuantity = situation.match(/\d+/);
  
      if (!numericQuantity || isNaN(parseInt(numericQuantity[0], 10))) {
        // Show a prompt to the user if the numeric part is not an integer
        alert("Please enter a valid integer value for quantity.");
        return; // Exit the function, don't proceed with the submission
      }
  
      const parsedQuantity = parseInt(numericQuantity[0], 10);

      const requestData = {
        topic: topic,
        situation: parsedQuantity,
        end_result: endResult,
        urgency: "regular",
      };

      axios
        .post(url + "/announcements", requestData)
        .then((res) => {
          console.log(res);
          // announcement added successfully
          setSituation("");
          setTopic("");
          setEndResult("");
          // Reset the form or perform any other necessary actions
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <HeaderMegaMenu />
      <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>Food</h1>
      <form>
        <div className="create-item">
          <label style={{ fontSize: "25px", color: "red" }}>*</label>
          <label htmlFor="topic" style={{ fontWeight: "bold" }}>
            Item:{" "}
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            required
            value={topic}
            onChange={handleTopicChange}
            style={{
              width: "20%",
              marginRight: "3px",
              marginBottom: "10px",
              borderRadius: "5px",
              borderWidth: "1.2px",
            }}
          />
          <label style={{ fontSize: "25px", color: "red" }}>*</label>
          <label htmlFor="situation" style={{ fontWeight: "bold" }}>
            Quantity:{" "}
          </label>
          <input
            type="text"
            id="situation"
            name="situation"
            required
            value={situation}
            onChange={handleSituationChange}
            style={{
              width: "20%",
              marginRight: "3px",
              marginBottom: "10px",
              borderRadius: "5px",
              borderWidth: "1.2px",
            }}
          />
          <br></br>
          <label htmlFor="end_result" style={{ fontWeight: "bold" }}>
            Notes:{" "}
          </label>
          <input
            type="text"
            id="end_result"
            name="end_result"
            value={endResult}
            onChange={handleNotesChange}
            style={{
              width: "60%",
              marginRight: "3px",
              marginBottom: "10px",
              borderRadius: "5px",
              borderWidth: "1.2px",
            }}
          />
        </div>
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          className="add-button"
        >
          Add New Food Item
        </Button>
      </form>
      <div>
        <label style={{ fontWeight: "bold" }}>Sort By: </label>
        <select
          value={sortBy}
          onChange={handleSortByChange}
          style={{ marginBottom: "10px" }}
        >
          <option value="topic">Food Name (A to Z)</option>
          <option value="-topic">Food Name (Z to A)</option>
          <option value="situation">Quantity (Least to Greatest)</option>
          <option value="-situation">Quantity (Greatest to Least)</option>
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
          withBorder
          withColumnBorders
          style={{ borderWidth: "1.5px", borderColor: "darkGray" }}
        >
          <thead>
            <tr>
              <th>
                {" "}
                <h3 style={{ textAlign: "center", color: "black" }}>
                  Food Item
                </h3>
              </th>
              <th>
                {" "}
                <h3 style={{ textAlign: "center", color: "black" }}>
                  Quantity
                </h3>
              </th>
              <th>
                {" "}
                <h3 style={{ textAlign: "center", color: "black" }}>Notes</h3>
              </th>
              <th>
                {" "}
                <h3 style={{ textAlign: "center", color: "black" }}>Edit</h3>
              </th>
            </tr>
          </thead>
          <DisplayAnnouncements announcements={announcements} />
        </Table>
      </div>
    </>
  );
};

export default Announcements;
