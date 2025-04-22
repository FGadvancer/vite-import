import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getSDK } from "@openim/wasm-client-sdk";

const IMSDK = getSDK();

function App() {
  const [loginParams, setLoginParams] = useState({
    userID: "",
    token: "",
    platformID: 5,
    apiAddr: "",
    wsAddr: "",
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


