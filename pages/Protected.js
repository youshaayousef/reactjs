import React, { useEffect, useState } from "react";
import axios from "axios";
function Protected() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  const getProtectedData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/protected/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  };
  useEffect(()=>{
    if (token){
        getProtectedData();
    }
  }, [token]);
return (
    <div>
        <h2>
            Protected page
        </h2>
        {data ? (
            <pre>{JSON.stringify(data,null,2)}</pre>
        ):(
            <p>Loading data ...</p>
        )}
    </div>
)
}
export default Protected;
