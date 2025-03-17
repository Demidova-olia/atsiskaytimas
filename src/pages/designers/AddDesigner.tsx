import React, { useState } from "react";
import DesignerForm from "../../components/DesignerForm";
import { Designer } from "../../components/types";

const AddDesigner: React.FC = () => {
  const [designer, setDesigner] = useState<Designer | null>(null);

  const handleSave = () => {
    setDesigner(null); 
    alert("Designer added successfully!");
  };

  return (
    <div>
      <h1>Add New Designer</h1>
      <DesignerForm
        initialValues={designer}
        onSave={handleSave}   
      />
    </div>
  );
};

export default AddDesigner;

