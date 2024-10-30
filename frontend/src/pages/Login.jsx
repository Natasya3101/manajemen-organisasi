// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService, register as registerService } from "../services/userService";

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const [register, setRegister] = useState({
        email: "",
        password: "",
        fullName: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChangeRegister = (e) => {
        const { name, value } = e.target;
        setRegister((prevRegister) => ({
            ...prevRegister,
            [name]: value,
        }));
    };

    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(""); // Reset error state

        try {
            if (isRegistering) {
                await registerService(register.fullName, register.email, register.password);
                setRegister({
                    email: "",
                    password: "",
                    fullName: "",
                });
                setIsRegistering(false); // Switch to login mode after successful registration
            } else {
                const successMessage = await loginService(login.email, login.password);
                alert(successMessage); // Show success message
                setLogin({
                    email: "",
                    password: "",
                });
                navigate("/anggota"); 
            }
        } catch (error) {
            setError(error.message); // Set error state to display
        }
    };

    const handleChangeForm = () => {
        setLogin({
            email: "",
            password: "",
        });
        setRegister({
            email: "",
            password: "",
            fullName: "",
        });
        setIsRegistering(!isRegistering); // Toggle between login and register
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isRegistering ? "Register" : "Login"}
                </h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {isRegistering && (
                        <div className="flex flex-col gap-2 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-1">Nama Lengkap</label>
                                <input
                                    name="fullName"
                                    value={register.fullName}
                                    onChange={handleChangeRegister}
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={isRegistering ? register.email : login.email}
                            onChange={isRegistering ? handleChangeRegister : handleChangeLogin}
                            placeholder="Enter your email"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
                        <input
                            value={isRegistering ? register.password : login.password}
                            onChange={isRegistering ? handleChangeRegister : handleChangeLogin}
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
                        >
                            {isRegistering ? "Register" : "Login"}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-500">
                        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            onClick={handleChangeForm}
                            className="text-gray-500 hover:underline"
                        >
                            {isRegistering ? "Login" : "Register"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
