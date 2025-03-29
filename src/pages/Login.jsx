import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast,Toaster } from "react-hot-toast";
import Cursor from "../components/cursor";

function Login() {
    useEffect(() => {

        if(localStorage.getItem("token")) {
            navigate("/Landing");
        }

    }, []);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email == "eve.holt@reqres.in"){
            if (password != "cityslicka")
                {
                    toast.error("Password is incorrect");
                    return;
                }
            }

        try {
            const response = await axios.post("https://reqres.in/api/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            toast.success("Login Successfully")
            navigate("/Landing");
        } catch (error) {
            toast.error("No user found.");
        }
    };

    return (
        <div className="select-none main h-screen w-full flex flex-col bg-white overflow-hidden">
            <Cursor />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="nav flex p-5 w-full">
                <h1  className="text-xl font-bold p-1 bg-amber-200">Employee Wise.</h1>
            </div>

            <div className="hero bg-white w-full h-screen flex flex-col">
                <div className="flex flex-col items-center p-15 justify-between">
                    <h1  className="text-3xl font-bold">Login</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col p-10 gap-10">
                        <div className="flex flex-col gap-5">
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                className="w-80 h-12 px-5 border-none py-2 focus:outline-none bg-[#F5f5f5] rounded-2xl transition-all ease-[.5s]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className="w-80 h-12 px-5 py-2 bg-[#F5f5f5] focus:outline-none rounded-2xl transition-all ease-[.5s]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                       <div className="flex flex-col gap-5 items-center justify-center"> 
                        <input
                            type="submit"
                            className="cursor-pointer w-full bg-black rounded-full font-bold text-xl py-2 text-white transition-all ease-[.5s]"
                            value="Login"
                            />
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
