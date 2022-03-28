import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addReducerUser } from "../../store/users-slice";

export default function AddUser() {
  const url = "http://localhost:3000/create";

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [updateErrors, setUpdateErrors] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateStarted, setDateStarted] = useState("");
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");
  const [managerId, setManagerId] = useState("");

  const dispatch = useDispatch();

  const handleCloseAddUser = () => {
    setAddUserModalOpen(false);
  };

  const handleOpenModal = () => {
    setAddUserModalOpen(true);
  };

  const handleAddUser = async () => {
    setUpdateErrors("");
    let salaryInNumber = "";
    try {
      salaryInNumber = parseInt(salary);
    } catch (error) {
      console.log("error: ", error);
    }

    try {
      const userObj = {
        firstName,
        lastName,
        email,
        dateStarted,
        salary,
        position,
        managerId,
      };
      userObj.salary = salaryInNumber;

      const response = await axios.post(url, userObj);
      userObj.id = response.data;
      dispatch(addReducerUser(userObj));
      handleCloseAddUser()
    } catch (error) {
      console.log("error: ", error);
      setUpdateErrors(error.response.data);
    }
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>ADD USER</Button>

      <Modal open={addUserModalOpen} onClose={handleCloseAddUser}>
        <Box className="modal-modal-close">
          <h2 id="modal-modal-title">ADD USER</h2>
          <div className="modal-modal-add-user">
            <TextField
              className="modal-modal-add-user-textfield"
              label="First Name"
              variant="standard"
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              className="modal-modal-add-user-textfield"
              label="Last Name"
              variant="standard"
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              className="modal-modal-add-user-textfield"
              label="Email"
              variant="standard"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className="modal-modal-add-user-textfield"
              label="Date Started"
              variant="standard"
              defaultValue={dateStarted}
              onChange={(e) => setDateStarted(e.target.value)}
            />
            <TextField
              className="modal-modal-add-user-textfield"
              label="Salary"
              variant="standard"
              defaultValue={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <TextField
              className="modal-modal-add-user-textfield"
              label="position"
              variant="standard"
              defaultValue={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <TextField
              className="modal-modal-add-user-textfield"
              label="Manager ID"
              variant="standard"
              defaultValue={managerId}
              onChange={(e) => setManagerId(e.target.value)}
            />
            <div className="modal-modal-error-message">{updateErrors}</div>
          </div>
          <div className="modal-modal-button-row">
            <Button onClick={handleCloseAddUser}>Cancel</Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
