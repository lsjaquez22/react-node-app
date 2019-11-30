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
      </div>
    )
  );
}

export default Home;
