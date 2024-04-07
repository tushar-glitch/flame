import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DOMAIN,
});

console.log(process.env);

export function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      password,
      username,
    };
    API.post("/auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("rating", res.data.flameDetails[0].classicalrating)
          navigate('/home')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h5" color="blue-gray">
        Login
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to login.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Username
          </Typography>
          <Input
            size="md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="jetha@123"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="md"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button className="mt-6" onClick={handleSubmit} fullWidth>
          Login
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          New user? <Link to="/">Register</Link>
        </Typography>
      </form>
    </Card>
  );
}
