import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Statistics = ({ id, question }) => {
  const [statistics, setStatistics] = useState([]);

  const fetchStatistics = async (questionId) => {
    const response = await fetch(
      `https://kyselypalvelu-backend.herokuapp.com/answerstatistics/${questionId}`
    );
    const json = await response.json();
    setStatistics(json);
  };

  const parseData = () => {
    const data = [];
    data.push(["Vastaus", "Määrä"]);
    statistics.forEach((s) => {
      data.push([s.text, s.count]);
    });
    return data;
  };

  useEffect(() => {
    fetchStatistics(id);
  }, [id]);

  const statisticStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  if (statistics.length === 0)
    return (
      <div>
        <p>Ei tilastoja näytettäväksi.</p>
      </div>
    );

  return (
    <div style={statisticStyles}>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={parseData()}
        options={{
          is3D: true
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default Statistics;
