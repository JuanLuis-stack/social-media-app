// Login.tsx

import { useState, type ChangeEvent, type FormEvent } from "react";
import { userGetter } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userSchema } from "../Schemas/userSchema";

const styles = {
  input:
    "w-full px-2 py-2 border border-white  rounded-md bg-black/10 placeholder:text-xs text-sm",
  link: "text-blue-500 hover:opacity-45 duration-75",
  submitterBtn: `cursor-pointer w-full bg-gradient-to-br
    from-[#15f]
    to-[#16f]  text-white p-2 rounded-md
    hover:opacity-45
    duration-150`,
  errorMessageStyle: `text-red-500 font-bold text-sm`,
};

type logUserType = {
  email: string;
  password: string;
};

function Login() {
  const { setLoggedUser } = useAuth();
  const navigate = useNavigate();
  const [logUser, setLogUser] = useState<logUserType>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
      return setError(true);
    }

    try {
      setLoading(true);

      const response = await userGetter(logUser);
      const user = userSchema.parse(response);

      setLoggedUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    navigate("/");
    setLogUser({
      email: "",
      password: "",
    });
    setError(false);
  }

  return (
    <div className="w-screen h-screen bg-linear-to-bl from-[#117]  to-[#112] p-4">
      <h2 className="text-center font-bold">Log in</h2>
      <form
        onSubmit={handleSubmit}
        className="py-1 flex flex-col gap-2"
        action=""
      >
        <label
          className={error ? styles.errorMessageStyle : ``}
          htmlFor="email"
        >
          Email:
        </label>
        <input
          id="email"
          name="email"
          value={logUser.email}
          className={styles.input}
          type="text"
          placeholder="Type here your email..."
          onChange={handleChange}
        />
        {error && <p className={styles.errorMessageStyle}>Email is require</p>}
        <div className="w-full flex justify-between">
          <label
            className={error ? styles.errorMessageStyle : ``}
            htmlFor="password"
          >
            Password:
          </label>
          <a className={styles.link} href="">
            Fotgot password?
          </a>
        </div>
        <input
          id="password"
          name="password"
          value={logUser.password}
          className={styles.input}
          type="password"
          placeholder="Type here your password..."
          onChange={handleChange}
        />
        {error && (
          <p className={styles.errorMessageStyle}>
            Password must have atleast 6 characters
          </p>
        )}
        <button className={styles.submitterBtn} type="submit">
          {loading ? "Loading..." : "Sign In"}
        </button>
        <p className="text-center">
          Don't have a account?{" "}
          <a className={styles.link} href="">
            Create an Account
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
