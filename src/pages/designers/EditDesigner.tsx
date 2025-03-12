import axios from "axios";
import { useEffect, useState } from "react";
import { Params, useParams } from "react-router";
import { API_URL } from "../../../config";
import { Designer } from "../../components/types";
import DesignerForm from "../../components/DesignerForm";


const EditDesigner: React.FC = () => {
  const { id } = useParams<Params>();
  const [designer, setDesigner] = useState<Designer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDesignerData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios(`${API_URL}/designers/${id}`);
        setDesigner(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Something went wrong...");
        setIsLoading(false);
      }
    };

    fetchDesignerData();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <div className={id}>
      <h1>Edit Designer</h1>
      {/* Передаем designer в форму для редактирования */}
      {designer ? <DesignerForm editDesignerData={designer} /> : <p>No designer data available.</p>}
    </div>
  );
};

export default EditDesigner;
