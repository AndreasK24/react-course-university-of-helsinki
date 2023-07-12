import { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}:</td>
    <td>{value}</td>
  </tr>
);
const Statistics = ({ good, bad, neutral, all, average, positive }) => {
  if (good || bad || neutral) {
    return (
      <table>
        <tbody>
          <StatisticLine text={"Good"} value={good}></StatisticLine>
          <StatisticLine text={"Neutral"} value={neutral}></StatisticLine>
          <StatisticLine text={"Bad"} value={bad}></StatisticLine>
          <StatisticLine text={"All"} value={all}></StatisticLine>
          <StatisticLine text={"Average"} value={average}></StatisticLine>
          <StatisticLine text={"Positive"} value={positive}></StatisticLine>
        </tbody>
      </table>
    );
  }
  return <h1>No feedback given</h1>;
};

const App = () => {
  const [good, setGood] = useState({ counter: 0, value: 1 });
  const [neutral, setNeutral] = useState({ counter: 0, value: 0 });
  const [bad, setBad] = useState({ counter: 0, value: -1 });
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    const updatedGood = good.counter + 1;
    const newGood = {
      ...good,
      counter: updatedGood,
    };
    setGood(newGood);
    const newAll = updatedGood + neutral.counter + bad.counter;
    setAll(newAll);
    const sumOfFeedBack = updatedGood * good.value + bad.counter * bad.value;
    const newAverage = sumOfFeedBack / newAll;
    setAverage(newAverage);
    const newPositive = updatedGood / newAll;
    setPositive(newPositive);
  };
  const handleNeutral = () => {
    const updatedNeutral = neutral.counter + 1;
    const newNeutral = {
      ...neutral,
      counter: updatedNeutral,
    };
    setNeutral(newNeutral);
    const newAll = good.counter + updatedNeutral + bad.counter;
    setAll(newAll);
    const sumOfFeedBack = good.counter * good.value + bad.counter * bad.value;
    const newAverage = sumOfFeedBack / newAll;
    setAverage(newAverage);
    const newPositive = good.counter / newAll;
    setPositive(newPositive);
  };
  const handleBad = () => {
    const updatedBad = bad.counter + 1;
    const newBad = {
      ...bad,
      counter: updatedBad,
    };
    setBad(newBad);
    const newAll = good.counter + neutral.counter + updatedBad;
    setAll(newAll);
    const sumOfFeedBack = good.counter * good.value + updatedBad * bad.value;
    const newAverage = sumOfFeedBack / newAll;
    setAverage(newAverage);
    const newPositive = good.counter / newAll;
    setPositive(newPositive);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button
          text={"good"}
          handleClick={() => {
            handleGood();
          }}
        ></Button>
        <Button
          text={"neutral"}
          handleClick={() => {
            handleNeutral();
          }}
        ></Button>
        <Button
          text={"bad"}
          handleClick={() => {
            handleBad();
          }}
        ></Button>
      </div>
      <h1>Statistics</h1>
      <Statistics
        good={good.counter}
        bad={bad.counter}
        neutral={neutral.counter}
        all={all}
        average={average}
        positive={positive}
      ></Statistics>
    </div>
  );
};

export default App;
