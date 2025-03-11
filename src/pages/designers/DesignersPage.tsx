import React, { useContext } from "react";
import { Link } from "react-router";
import { ApiContext } from "../../contexts/ApiContext";
import { Designer } from "../../components/types";

const DesignersPage: React.FC = () => {
  const apiContext = useContext(ApiContext);

  if (!apiContext) {
    return <p>Loading context...</p>;
  }

  const { designers = [], loading, error } = apiContext;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Designers:</h1>
      <Link to="/designers/create">Add New Designer</Link>
      {designers.length > 0 ? (
        <ul>
          {designers.map((designer: Designer) => (
            <li key={designer.designer_id}>
              <Link to={`/designers/${designer.designer_id}`}>
                <div>
                  <img src={designer.image} alt={designer.name} />
                </div>
                {designer.designer_id}. {designer.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No designers found.</p>
      )}
    </div>
  );
};

export default DesignersPage;

