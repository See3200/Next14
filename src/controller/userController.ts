import { User } from "@/types/User";
import useStore from "@/store/Store";

interface IUserController {
  reduceUsers: () => User[];
}

class UserController implements IUserController {
  reduceUsers = () => {
    //doesn't work because hook must be only in jsx
    const { users, setUsers } = useStore();
    const newList = [...users];
    setUsers(newList.slice(0, 2));
    return newList;
  };
}

const userController = new UserController();
export default userController;

export const reduceUsers = () => {
  //doesn't work because hook must be only in jsx
  const { users, setUsers } = useStore();
  const newList = [...users];
  setUsers(newList.slice(0, 2));
  return newList;
};
