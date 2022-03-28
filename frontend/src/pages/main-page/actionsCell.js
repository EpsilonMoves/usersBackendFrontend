import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./usersTable.css";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import {
  deleteReducerUser,
  selectUsers,
  updateReducerUser,
} from "../../store/users-slice";
import { TextField } from "@mui/material";

export default function ActionsCell({ userData }) {
  const deleteUrl = "http://localhost:3000/deleteUser";
  const updateUrl = "http://localhost:3000/updateUser";

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [updateErrors, setUpdateErrors] = useState(" ");
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);

  const handleOpenDelete = () => setDeleteModalOpen(true);
  const handleCloseDelete = () => setDeleteModalOpen(false);
  const handleOpenEdit = () => setEditModalOpen(true);
  const handleCloseEdit = () => setEditModalOpen(false);
  const dispatch = useDispatch();

  const handleDeleteUser = async () => {
    const response = await axios.get(`${deleteUrl}/${userData.id}`);
    console.log("response.status: ", response.status);
    if (response.status === 200) {
      dispatch(deleteReducerUser(userData.id));
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.post(`${updateUrl}/${userData.id}`, {
        firstName,
        lastName,
      });
      dispatch(updateReducerUser({ id: userData.id, firstName, lastName }));
      handleCloseEdit();
    } catch (error) {
      console.log("error: ", error.response.data);
      setUpdateErrors(error.response.data);
    }
  };

  return (
    <div className="action-cell">
      <DeleteIcon onClick={handleOpenDelete} />
      <Modal open={deleteModalOpen} onClose={handleCloseDelete}>
        <Box className="modal-modal-close">
          <h2 id="modal-modal-title">DELETE USER</h2>
          <p id="modal-modal-description" sx={{ mt: 2 }}>
            {`Are you sure you want to delete user ${userData.firstName} ${userData.lastName}?`}
          </p>
          <div className="modal-modal-button-row">
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button onClick={handleDeleteUser}>Delete</Button>
          </div>
        </Box>
      </Modal>

      <EditIcon onClick={handleOpenEdit} />
      <Modal open={editModalOpen} onClose={handleCloseEdit}>
        <Box className="modal-modal-close">
          <h2 id="modal-modal-title">EDIT USER</h2>
          <div className="modal-modal-edit-items">
            <TextField
              label="First Name"
              variant="standard"
              defaultValue={firstName}
              onChange={handleFirstNameChange}
            />
            <TextField
              label="Last Name"
              variant="standard"
              defaultValue={lastName}
              onChange={handleLastNameChange}
            />
            <div className="modal-modal-error-message">{updateErrors}</div>
          </div>
          <div className="modal-modal-button-row">
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button onClick={handleUpdateUser}>Update</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
