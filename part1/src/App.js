const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    );
  };

  const Part = (props) => {
    return (
      <div>
        <p>
          {props.obj.name} {props.obj.exercises}
        </p>
      </div>
    );
  };

  const Content = (props) => {
    return (
      <div>
        <Part obj={props.obj1} />
        <Part obj={props.obj2} />
        <Part obj={props.obj3} />
      </div>
    );
  };

  const Total = (props) => {
    return (
      <div>
        <p>
          Number of exercises
          {props.obj1.exercises + props.obj2.exercises + props.obj3.exercises}
        </p>
      </div>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content obj1={part1} obj2={part2} obj3={part3} />
      <Total obj1={part1} obj2={part2} obj3={part3} />
    </div>
  );
};

export default App;
