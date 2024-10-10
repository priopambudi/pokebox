import React from "react";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="text-white" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default Detail;
