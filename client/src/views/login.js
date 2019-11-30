import React from "react";
// import { Redirect } from "react-router-dom";
// import axios from "axios";

function Login() {
  // const [list, setList] = React.useState([]);

  // const [auth, setAuth] = React.useState(false);

  // React.useEffect(() => {
  //   axios
  //     .post("/api/login", {
  //       body: {
  //         form
  //       }
  //     })
  //     .then(response => {
  //       console.log(response);
  //     });
  // }, []);

  return (
    <div>
      {/* {false ? <Redirect to="/" /> : null} */}
      <div>
        <h1>Login</h1>
        <form action="/api/login" method="POST">
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password" required></input>
          </div>
          <button type="submit">Login</button>
        </form>
        <a href="/register">Registrar</a>
      </div>
    </div>
  );
}
export default Login;
