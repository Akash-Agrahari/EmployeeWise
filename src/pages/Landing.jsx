// Import haedings.. //
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast,Toaster } from "react-hot-toast";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Cursor from '../components/Cursor'

function Landing() {
  const [logOutMessage, setLogOutMessage] = useState("");
  const [loader,setLoader] = useState(false);
  const [serachTerm, setSearchTerm] = useState("");
  const [deleteMessage, setdeleteMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [userDelete, setUserDelete] = useState(false);
  const [logout, setLogout] = useState(false);
  const [form, setForm] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
  });
 
  const navigate = useNavigate();

  useEffect(() => {

    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    setLoader(true)
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://reqres.in/api/users?page=2");
        setUsers(res.data.data || []);
      } catch (err) {
        console.log("Error fetching users:", err);
      }
      finally{
        setLoader(false)
      }
    };
    fetchUsers();
  }, []);

  // Filter users by char or by full name
  const filterUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return (
      fullName.includes(serachTerm.toLowerCase()) || 
      user.first_name.toLowerCase().includes(serachTerm.toLowerCase()) || 
      user.last_name.toLowerCase().includes(serachTerm.toLowerCase())
    );
  });
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoader(true)

    try {
      const res = await axios.put(`https://reqres.in/api/users/${form.id}`, form);

      const updatedUsers = users.map((user) =>
        user.id === form.id ? { ...user, ...form } : user
      );

      setUsers(updatedUsers);
      setShowEdit(false);
      toast.success("User updated successfully.");
    } catch (err) {
      console.log("Error updating user:", err);
      toast.error("Failed to update user.");
    }
    setLoader(false)
  };

  
  const handleDelete = async (e) => {
    e.preventDefault();
    setLoader(true)

    if (deleteMessage !== "DELETE") {
      toast.error("Please type DELETE to confirm deletion.");
      return;
    }

    try {
      if (!form.id) {
        toast.error("User not found or invalid ID.");
        return;
      }

      await axios.delete(`https://reqres.in/api/users/${form.id}`);

      const updatedUsers = users.filter((user) => user.id !== form.id);
      setUsers(updatedUsers);
      
      setUserDelete(false);
      setdeleteMessage("");
      setForm({ id: "", email: "", first_name: "", last_name: "" });
      
      toast.success("User deleted successfully.");
    } catch (err) {
      console.log("Error deleting user:", err);
      toast.error("Failed to delete user.");
    }
    setLoader(false)
  };

  const handleLogout = (e) => {
    e.preventDefault(); 
    setLoader(true)
  
    if (logOutMessage !== "LOGOUT") {
      toast.error("Please type LOGOUT to confirm logout.");
      return;
    }
    toast.success("Logout Successfully")
    localStorage.removeItem("token");
    setLogout(false);
    setLoader(false)
    navigate("/");
  };

  return (
    <div className="main w-full h-screen bg-white gap-20 flex flex-col overflow-auto">
      {loader && (
        <div className="absolute loader-ios" >
          <DotLottieReact
            src="https://lottie.host/3ec41960-ed1d-469b-9e18-e68c420086cb/3NHH2ArpU0.lottie"
            loop
            className="fixed z-10 top-10 left-45 transform -translate-x-1/2 -translate-y-1/2"
            autoplay
            width={30}
            />
            </div>
      )}
        <Cursor />
        <Toaster position="top-center" reverseOrder={false}  />
      <div className="nav fixed bg-white border-b border-[#dadada] flex p-5 w-full items-center justify-between">
        <div className="left flex items-center">
          <h1 className="h1 select-none text-xl font-bold p-1 bg-red-200">Listed Users.</h1>
        </div>
        <div className="right flex justify-end gap-4 items-center">
          <input
            type="search"
            value={serachTerm}
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search border-none cursor-pointer focus:outline-none w-full max-w-[300px] bg-[#f5f5f5] rounded-full px-5 py-2"
          />
          <button
            onClick={() => setLogout(true)}
            className="font-bold cursor-pointer text-white px-5 py-2 rounded-full bg-black"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="hero select-none flex flex-col mt-20 md:flex-row w-full h-full bg-white">
      { logout && (
       
       <div className="logout  flex flex-col justify-center absolute top-1/2 left-1/2 px-10 py-15 border rounded-3xl bg-white transform -translate-x-1/2 -translate-y-1/2 ">
          <div className="flex flex-col gap-1">
          <h1 className="h1 font-bold tracking-tight text-2xl ">Logout Really haan?</h1>
          <p className="tracking-tighter text-sm  text-red-500">See You Later.</p>
          </div>
          <form onSubmit={handleLogout} className="flex flex-col  mt-5">
          <input
            onChange={(e) => setLogOutMessage(e.target.value)}
            type="text"
            required
            className=" search-dialog focus:outline-none bg-[#f5f5f5] px-5 py-2 rounded-full"
            placeholder="Type LOGOUT here to logout /*"
            />
          <div className="flex gap-5 mt-5">
            <button
              type="button"
              onClick={() => setLogout(false)}
              className="input-button cursor-pointer text-black underline px-4 py-2 rounded-full font-bold"
            >
              Stay Here
            </button>
            <button
              type="submit"
              className="input-button cursor-pointer bg-black text-white w-[10rem] px-5 py-2 rounded-full font-bold"
            >Logout
            </button>
            </div>
            </form>
        </div>
      )

      }
        <div className="left w-full md:w-[70%] flex flex-col h-auto overflow-auto  md:h-screen p-5">
          <div className="users-list flex flex-col gap-5">
            { filterUsers.length === 0 ? 
             <div className="query flex flex-col gap-1"><h1 className="text-xl tracking-tight font-bold">Ahh, I know its Frustating. 🤫</h1>
            <p className="para text-red-500 tracking-tight text-lg">Finding something which is not even exist.</p>
             </div>
             :
             filterUsers.map((user) => (
              <div
                key={user.id}
                className="user-card flex items-center justify-between border-b border-[#dadada] p-4"
              >
                <div className="user-info flex items-center gap-4">
                  <img src={user.avatar} alt={user.first_name} className="w-12 h-12 rounded-full" />
                  <div>
                    <h2 className="h2 font-bold text-lg">{`${user.first_name} ${user.last_name}`}</h2>
                    <p className="email-para text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="actions flex gap-3">
                  <button
                    onClick={() => {
                      if(userDelete){
                        return toast.error("Close Delete First")
                      }
                      setForm({
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                      });
                      setShowEdit(true);
                    }}
                    className="cursor-pointer bg-black text-white w-[10rem] px-5 py-2 rounded-full font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if(showEdit){
                        return toast.error("Close Edit First")
                      }
                      setForm({
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                      });
                      setUserDelete(true);
                    }}
                    className="cursor-pointer text-black underline px-4 py-2 rounded-full font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
              ))
             }
          </div>
        </div>

        {showEdit &&  (
  <div className=" dialog-box right md:border-l border-b md:border-b-0 border-[#dadada] w-full md:w-[30%] h-auto md:h-screen flex flex-col p-5 gap-5">
    <h1 className="h1 text-2xl font-bold">Edit</h1>
    <p className="para text-md tracking-tighter text-red-500">Ohh ! So You Really Like keeping Things Updated. </p>
    <form onSubmit={handleUpdate} className="flex flex-col gap-5">
      <input
        type="email"
        value={form.email}

        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="search-dialog focus:outline-none bg-[#f5f5f5] px-5 py-2 rounded-full"
        placeholder="Email"
      />

      <div className="flex gap-5">
        <input
          type="text"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          className="search-dialog focus:outline-none bg-[#f5f5f5] px-5 py-2 rounded-full w-1/2"
          placeholder="First Name"
        />
        <input
          type="text"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          className="search-dialog focus:outline-none bg-[#f5f5f5] px-5 py-2 rounded-full w-1/2"
          placeholder="Last Name"
        />
      </div>

      {/* Buttons in One Line */}
      <div className="flex gap-5">
        <input
          type="button"
          value="My mistake"
          onClick={() => setShowEdit(false)}
          className="input-button cursor-pointer text-black underline px-4 py-2 rounded-full font-bold w-1/2"
        />
        <input
          type="submit"
          value="Update"
          className="input-button cursor-pointer bg-black text-white px-5 py-2 rounded-full font-bold w-1/2"
        />
      </div>
    </form>
  </div>
)
}


        {userDelete && (
          <div className="dialog-box right md:border-l border-b md:border-b-0 border-[#dadada] w-full md:w-[30%] h-auto md:h-screen flex flex-col p-5 gap-5">
            <h1 className="h1 text-2xl font-bold">Delete</h1>
            <p className="para text-md tracking-tight text-red-500">Leaving Me So Quickely. 😞</p>
            <form onSubmit={handleDelete} className="flex flex-col gap-5">
              <input
                onChange={(e) => setdeleteMessage(e.target.value)}
                type="text"
                required 
                className="search-dialog focus:outline-none bg-[#f5f5f5] px-5 py-2 rounded-full"
                placeholder="Type DELETE here to remove"
              /> 
              <div className="flex gap-5">
                <input
                  type="button"
                  value="My mistake"
                  onClick={() => setUserDelete(false)}
                  className="input-button cursor-pointer text-black underline px-4 py-2 rounded-full font-bold"
                />
                <input
                  type="submit"
                  value="Delete"
                  className="input-button cursor-pointer bg-black text-white w-[10rem] px-5 py-2 rounded-full font-bold"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;