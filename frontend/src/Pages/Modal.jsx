import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "../App.css";

function MyVerticallyCenteredModal(props) {
  const [queries, setQueries] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('Modal opened for user:', props.user_id);
    handleViewClick(props.user_id);
  }, [props.user_id]);

  const handleViewClick = async (user_id) => {
    console.log('Fetching chat data for user:', user_id);
    if (user_id) {
      try {
        const response = await axios.get(
          `https://be93-2400-adc5-10a-e400-ec1b-fb69-e147-1d4c.ngrok-free.app/completions/${user_id}`
        );
        const data = response.data;
        const queriesArray = Array.isArray(data) ? data : [data];
        const extractedData = queriesArray.map((data) => ({
          content: JSON.parse(data.query[0])[0].content,
          response: data.response,
        }));
        // console.log('Hi' ,extractedData)
        setQueries(extractedData);
        setSelectedUser(user_id);
        setModalVisible(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <Modal
      className="model_main"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="Modal_header">
        <Modal.Title id="contained-modal-title-vcenter">
          Conversation for {selectedUser}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="conversation-table">
          <div className="conver_Table">
            {queries.map((data, index) => (
              <div key={index}>
                <strong>
                  {" "}
                  <p>{data.content}</p>
                </strong>
                {data.response.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="btn_model">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
