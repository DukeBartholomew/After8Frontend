import React from "react";
import { Button } from "@mantine/core";
import axios from "axios";
import "../css/buttonHover.css";

const DisplayAnnouncements = (props) => {
  const url = process.env.REACT_APP_URL;

  const handleDelete = (announcement_id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(url + "/announcements/" + announcement_id)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEdit = (announcement_id, situation, end_result) => {
    const newSituation = prompt("Please enter the new quantity: ", situation);
    if (newSituation) {
      const newNotes = prompt(
        "Type to edit notes. Otherwise, click OK",
        end_result
      );
      axios
        .put(url + "/announcements/" + announcement_id, {
          situation: newSituation,
          end_result: newNotes,
        })
        .then((res) => {
          console.log("Situation Succesfully Updated");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (newSituation === "") {
      const newNotes = prompt(
        "Type to edit notes. Otherwise, click OK",
        end_result
      );

      axios
        .put(url + "/announcements/" + announcement_id, {
          situation: " ",
          end_result: newNotes,
        })
        .then((res) => {
          console.log("Situation Succesfully Updated");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  const display = (props) => {
    const { announcements } = props;

    if (!announcements || announcements.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan="5">
              <h1>No Food In Inventory</h1>
            </td>
          </tr>
        </tbody>
      );
    }
    console.log(announcements);

    // const sortedAnnouncements = announcements.sort((a, b) => {
    //   const topicA = a.topic.toLowerCase();
    //   const topicB = b.topic.toLowerCase();
    //   if (topicA < topicB) return -1;
    //   if (topicA > topicB) return 1;
    //   return 0;
    // });

    if (announcements.length > 0) {
      const rows = announcements.map((announcement) => (
        <tr key={announcement.announcement_id}>
          <td style={{ backgroundColor: "inherit" }}>
            <h3>{announcement.topic}</h3>
          </td>
          <td style={{ backgroundColor: "inherit" }}>
            <h4>{announcement.situation}</h4>
          </td>
          <td style={{ backgroundColor: "inherit" }}>
            <h5>{announcement.end_result}</h5>
          </td>

          <td>
            <Button
              className="edit-button"
              onClick={() => {
                handleEdit(
                  announcement.announcement_id,
                  announcement.situation,
                  announcement.end_result
                );
              }}
            >
              Edit
            </Button>
            <Button
              className="delete-button"
              onClick={() => handleDelete(announcement.announcement_id)}
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

export default DisplayAnnouncements;
