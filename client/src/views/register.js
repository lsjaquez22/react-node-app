import React from "react";

function Register() {
  return (
    <div>
      <h1>Registrar</h1>
      <form action="/api/register" method="POST">
        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" required></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" required></input>
        </div>
        <button type="submit">Registrar</button>
      </form>
      <a href="/login">Login</a>
    </div>
  );
}
export default Register;
