async function login() {
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

  localStorage.setItem(
    "x-csrf-token",
    response.headers.get("x-csrf-token") as string
  );
}

async function getProtected() {
  const xCsrfToken = localStorage.getItem("x-csrf-token") as string;
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
}

function App() {
  return (
    <div className="App">
      <button onClick={login}>Login</button>
      <button onClick={getProtected}>Protected Route</button>
    </div>
  );
}

export default App;
