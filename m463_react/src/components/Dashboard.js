import { useState } from "react";
import Analyze from "../pages/Analyze";
import Results from "../pages/Results";
import Layout from "./Layout";

export default function Dashboard() {

    const [result, setResult] = useState(null);
    const [ahpReport, setAhpReport] = useState(null);
    const [restaurantCategory, setRestaurantCategory] = useState(0);
    const [competitionGoal, setCompetitionGoal] = useState("0");

  return (
    <Layout>
      {(result && ahpReport) ? 
      <Results result={result} 
      ahpReport={ahpReport}
      restaurantCategory={restaurantCategory}
      competitionGoal={competitionGoal}
      />
      :
      <Analyze 
      setResult={setResult}
      setAhpReport={setAhpReport}
      restaurantCategory={restaurantCategory}
      competitionGoal={competitionGoal}
      setRestaurantCategory={setRestaurantCategory}
      setCompetitionGoal={setCompetitionGoal}
      />}
    </Layout>

  );
}