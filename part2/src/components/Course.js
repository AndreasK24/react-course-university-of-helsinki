const Total = ({ content }) => {
  const initialValue = 0;
  const arr = [];
  content.map((part) => arr.push(part.exercises));
  console.log(content);
  const total = arr.reduce((s, p) => s + p, initialValue);
  return (
    <div>
      <b> Total of {total} exercises</b>
    </div>
  );
};

const Part = ({ content, exercises }) => (
  <div>
    {content} {exercises}
  </div>
);

const Content = ({ content }) => {
  return (
    <div>
      {content.map((info) => (
        <Part
          key={info.id}
          content={info.name}
          exercises={info.exercises}
        ></Part>
      ))}
    </div>
  );
};

const Header = ({ content }) => {
  return <h1>{content}</h1>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header content={course.name}></Header>
      <Content content={course.parts}></Content>
      <Total content={course.parts}></Total>
    </div>
  );
};

export default Course;
