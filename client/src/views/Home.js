import React from "react";
import axios from "axios";

function Home() {
  const [companies, setCompanies] = React.useState(null);

  React.useEffect(() => {
    axios.get("/api/customers").then(response => {
      setCompanies(response.data);
    });
  }, []);

  return (
    companies && (
      <div>
        <h1>Home</h1>
        <ul>
          {companies.map(company => (
            <li key={company.id}>{company.nombre}</li>
          ))}
        </ul>
        <form action="/api/logout" method="POST">
          <div>
            <button type="submit">Log Out</button>
          </div>
        </form>
      </div>
    )
  );
}

export default Home;
