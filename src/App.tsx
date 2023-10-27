import { useEffect, useState } from "react";

async function getProtected() {
  console.log("protected");
  const xCsrfToken = localStorage.getItem("x-csrf-token") as string;
  console.log("x-csrf-token", xCsrfToken);
  const response = await fetch(
    // `${process.env.REACT_APP_SERVER_URL_LIVE}/v1/protected`,
    `${process.env.REACT_APP_SERVER_URL_LOCAL}/v1/protected`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": xCsrfToken,
      },
      credentials: "include",
    }
  );

  console.log("response", response);
  console.log("response headers", response.headers);
  console.log(
    "response headers > x-csrf-token",
    response.headers.get("x-csrf-token")
  );
  const responseJson = await response.json();
  console.log("json response", responseJson);
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let loggedIn = localStorage.getItem("x-csrf-token");
    if (loggedIn) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [authenticated]);

  async function login() {
    console.log("login");
    const response = await fetch(
      // `${process.env.REACT_APP_SERVER_URL_LIVE}/v1/login`,
      `${process.env.REACT_APP_SERVER_URL_LOCAL}/v1/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: "anon@anon.com",
          password: "password",
        }),
      }
    );

    console.log("response", response);
    console.log(
      "response headers - x-csrf-token >",
      response.headers.get("x-csrf-token")
    );
    localStorage.setItem(
      "x-csrf-token",
      response.headers.get("x-csrf-token") as string
    );
    const responseJson = await response.json();
    console.log("json response", responseJson);
    setAuthenticated(true);
  }

  function logoutV2() {
    localStorage.removeItem("x-csrf-token");
    setAuthenticated(false);
  }

  return (
    <div className="App">
      {authenticated ? (
        <button onClick={logoutV2}>Log out</button>
      ) : (
        <button onClick={login}>Login</button>
      )}

      <button onClick={getProtected}>Protected Route</button>
    </div>
  );
}

export default App;
