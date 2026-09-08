// Login.tsx

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { userGetter } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userRetrivedSchema } from "../Schemas/userSchema";
import loginVideo from "../media/loginTexture.mp4";

type logUserType = {
  email: string;
  password: string;
};

function Login() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setLoggedUser } = useAuth();
  const navigate = useNavigate();
  const [logUser, setLogUser] = useState<logUserType>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(0);
  // 0 = everything is good
  // 1 = empty camp
  // 2 = user undefined

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setLogUser((prev) => ({
      ...prev,
      [name as keyof logUserType]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, password } = logUser;

    if (!email || !password) {
      return setError(1);
    }

    try {
      setLoading(true);

      const response = await userGetter(logUser);
      const user = userRetrivedSchema.parse(response);

      setLoggedUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      setLogUser({
        email: "",
        password: "",
      });
      setError(0);
    } catch (error) {
      console.log(error);
      setError(2);
      return;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-screen h-screen relative"
      onClick={() => videoRef.current?.play()}
    >
      <div className="w-screen flex justify-center h-full p-7  md:absolute left-0 z-10 bg-[#112] xl:bg-transparent md:backdrop-blur-2xl md:justify-center xl:w-[45%]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full md:w-md xl:w-sm mt-20 md:mt-10"
          action=""
        >
          <p className="text-center text-2xl text-white font-bold underline pb-14 xl:pb-8">
            Log in
          </p>
          <div className="mb-4 grid gap-2 xl:mb-2">
            <label
              className={`font-semibold text-white ml-2 text-sm ${error === 1 && `text-red-500 font-bold`}`}
              htmlFor="email"
            >
              Email:
            </label>
            <input
              id="email"
              name="email"
              value={logUser.email}
              className="w-full px-4 bg-white/4 py-3 border border-white/50 focus:outline-none rounded-xl text-sm"
              type="text"
              placeholder="Type here your email..."
              onChange={handleChange}
            />
            {error === 1 && (
              <p className="text-red-500 font-bold text-sm ml-2">
                Email is require
              </p>
            )}
          </div>
          <div className="mb-2">
            <div className="w-full flex justify-between mb-2">
              <label
                className={`font-semibold text-white ml-2 text-sm ${error === 1 && `text-red-500`}`}
                htmlFor="password"
              >
                Password:
              </label>
              <a
                className="text-blue-500 text-sm duration-75 hover:underline hover:opacity-70"
                href=""
              >
                Fotgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              value={logUser.password}
              className="w-full px-4 bg-white/4 py-3 border border-white/50 focus:outline-none rounded-xl text-sm"
              type="password"
              placeholder="Type here your password..."
              onChange={handleChange}
            />
            {error === 1 && (
              <p className="text-red-500 font-bold text-sm ml-28">
                Password must have atleast 6 characters
              </p>
            )}
          </div>
          <button
            className="cursor-pointer md:my-4 w-full bg-linear-to-br from-[#15f] to-[#16f] text-white p-3 xl:p-2 rounded-2xl hover:opacity-80 duration-150 shadow-[-2px_2px_10px_#15f]"
            type="submit"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <p className="text-center">
            Don't have a account?{" "}
            <a
              className="text-blue-500 duration-75 hover:underline hover:opacity-70"
              href=""
            >
              Create an Account
            </a>
          </p>
          {error === 2 && (
            <div className="w-full flex justify-center">
              <p className="text-red-500 font-bold text-sm">
                User is undefined
              </p>
            </div>
          )}
        </form>
      </div>
      <div className="hidden xl:block md:w-screen h-screen relative overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={loginVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60" />
      </div>
    </div>
  );
}

export default Login;
