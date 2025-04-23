import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getSDK } from "@openim/wasm-client-sdk";

const IMSDK = getSDK();

function App() {
  const [loginParams, setLoginParams] = useState({
    userID: "9287067436",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI5Mjg3MDY3NDM2IiwiUGxhdGZvcm1JRCI6NSwiZXhwIjoxNzUzMTUyODI5LCJpYXQiOjE3NDUzNzY4MjR9.t9DB8eu0azM72fDn1_-cgT5BJ_NC6lOQIo0nlND4f6A",
    platformID: 5,
    apiAddr: "https://web.openim.io/api",
    wsAddr: "wss://web.openim.io/msg_gateway",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginParams((prev) => ({
      ...prev,
      [name]: name === "platformID" ? Number(value) : value,
    }));
  };

  const handleLogin = async () => {
    try {
      await IMSDK.login(loginParams);
      alert("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed: " + error.message);
    }
  };

  const handleNetworkStatusChanged = async () => {
    try {
      await IMSDK.networkStatusChanged();
    } catch (error) {}
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            name="userID"
            placeholder="User ID"
            value={loginParams.userID}
            onChange={handleChange}
          />
          <input
            name="token"
            placeholder="Token"
            value={loginParams.token}
            onChange={handleChange}
          />
          <input
            name="platformID"
            type="number"
            placeholder="Platform ID"
            value={loginParams.platformID}
            onChange={handleChange}
          />
          <input
            name="apiAddr"
            placeholder="API Address"
            value={loginParams.apiAddr}
            onChange={handleChange}
          />
          <input
            name="wsAddr"
            placeholder="WebSocket Address"
            value={loginParams.wsAddr}
            onChange={handleChange}
          />
          <button onClick={handleLogin}>Login</button>
        </div>

        <button onClick={handleNetworkStatusChanged}>
          Check Network Status
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;


