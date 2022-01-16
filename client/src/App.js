import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };
  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/weather?address=${userInput}`);
      setLocation(response.data.location);
      setForecast(response.data.forecast);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="text" onChange={handleInput} value={userInput} />
      <button onClick={handleClick}>search</button>
      <div>{isLoading && location}</div>
      <div>{isLoading && forecast}</div>
    </div>
  );
};

export default App;
