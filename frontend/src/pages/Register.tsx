// Register.tsx

import { useState, type ChangeEvent, type FormEvent } from "react";
import { userRegister } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userRetrivedSchema } from "../Schemas/userSchema";
import registerVideo from "../media/loginTexture.mp4";

type logUserType = {
  name: string;
  user_name: string;
  email: string;
  password: string;
};

type RegisterErrors = Partial<Record<keyof logUserType, string>>;

function Register() {
  const { setLoggedUser } = useAuth();
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState<logUserType>({
    name: "",
    user_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<RegisterErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  function validateForm() {
    const nextErrors: RegisterErrors = {};
    const { name, user_name, email, password } = registerUser;
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;

    if (!usernamePattern.test(user_name)) {
      nextErrors.user_name = "User name can't have spaces";
    }

    if (!name) nextErrors.name = "Name is required";
    if (!user_name) nextErrors.user_name = "User name is required";
    if (!email) nextErrors.email = "Email is required";
    if (!password) nextErrors.password = "Password is required";
    setError(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setRegisterUser((prev) => ({
      ...prev,
      [name as keyof logUserType]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await userRegister(registerUser);
      const user = userRetrivedSchema.parse(response);

      setLoggedUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      setRegisterUser({
        email: "",
        password: "",
        name: "",
        user_name: "",
      });
      setError({});
    } catch (error) {
      console.log(error);
      setServerError("user name or email already exists");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen relative">
      <div className="w-screen flex justify-center h-full p-7 md:absolute left-0 z-10 bg-[#112] xl:bg-transparent md:backdrop-blur-2xl md:justify-center xl:w-[45%]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full md:w-md xl:w-sm mt-0"
          action=""
        >
          <p className="text-center text-2xl text-white font-bold underline pb-2">
            Register
          </p>
          <div className="mb-2 grid gap-2">
            <div className="w-full flex justify-between">
              <label
                className={`font-semibold text-white ml-2 text-sm ${error.user_name && `text-red-500 font-bold`}`}
                htmlFor="user_name"
              >
                User name:
              </label>
              {error.user_name && (
                <p className="text-red-500 font-bold text-sm ml-2">
                  {error.user_name}
                </p>
              )}
            </div>
            <input
              id="user_name"
              name="user_name"
              value={registerUser.user_name}
              className="w-full px-4 bg-white/4 py-3 border border-white/50 focus:outline-none rounded-xl text-sm"
              type="text"
              placeholder="Type here your user name..."
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <div className="w-full flex justify-between mb-2">
              <label
                className={`font-semibold text-white ml-2 text-sm ${error.name && `text-red-500`}`}
                htmlFor="name"
              >
                Name:
              </label>
              {error.name && (
                <p className="text-red-500 font-bold text-sm ml-28">
                  {error.name}
                </p>
              )}
            </div>
            <input
              id="name"
              name="name"
              value={registerUser.name}
              className="w-full px-4 bg-white/4 py-3 border border-white/50 focus:outline-none rounded-xl text-sm"
              type="text"
              placeholder="Type here your name..."
              onChange={handleChange}
            />
          </div>

          <div className="mb-2 grid gap-2">
            <div className="w-full flex justify-between">
              <label
                className={`font-semibold text-white ml-2 text-sm ${error.email && `text-red-500 font-bold`}`}
                htmlFor="email"
              >
                Email:
              </label>
              {error.email && (
                <p className="text-red-500 font-bold text-sm ml-2">
                  {error.email}
                </p>
              )}
            </div>
            <input
              id="email"
              name="email"
              value={registerUser.email}
              className="w-full px-4 bg-white/4 py-3 border border-white/50 focus:outline-none rounded-xl text-sm"
              type="email"
              placeholder="Type here your email..."
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <div className="w-full flex justify-between mb-2">
              <label
                className={`font-semibold text-white ml-2 text-sm ${error.password && `text-red-500`}`}
                htmlFor="password"
              >
                Password:
              </label>
              {error.password && (
                <p className="text-red-500 font-bold text-sm ml-28">
                  {error.password}
                </p>
              )}
            </div>
            <input
              id="password"
              name="password"
              value={registerUser.password}
              className="w-full px-4 bg-white/4 py-3 border border-white/50 focus:outline-none rounded-xl text-sm"
              type="password"
              placeholder="Type here your password..."
              onChange={handleChange}
            />
          </div>
          <div>
            {serverError && (
              <p className="text-red-500 text-center font-bold text-sm ml-2 mb-2">
                {serverError}
              </p>
            )}
            <button
              className="cursor-pointer mt-1 w-full bg-linear-to-br from-[#15f] to-[#16f] text-white p-2 rounded-2xl hover:opacity-80 duration-150 shadow-[-2px_2px_10px_#15f]"
              type="submit"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <p className="text-center">
              Don't have a account?{" "}
              <Link
                className="text-blue-500 duration-75 hover:underline hover:opacity-70"
                to="/login"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="hidden xl:block md:w-screen h-screen relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={registerVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60" />
      </div>
    </div>
  );
}

export default Register;
