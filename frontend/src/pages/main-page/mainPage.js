import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setReducerUsers } from "../../store/users-slice";
import AddUser from "./add-user";
import UsersTable from "./usersTable";

const MainPage = () => {
  const url = "http://localhost:3000/allUsers";
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get(url);
      response.data.forEach((e) => (e.id = e._id));
      dispatch(setReducerUsers(response.data));
    };
    getAllUsers();
  }, []);

  return (
    <div>
        <AddUser/>
      <UsersTable />
    </div>
  );
};

export default MainPage;
