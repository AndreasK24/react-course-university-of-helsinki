import { Link } from "react-router-dom";

const Menu = ({ anecdotes, setAnecdotes }) => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link style={padding} to="/">
        home
      </Link>
      <Link style={padding} to="/create">
        create
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>

      {/* <Link style={padding} to="/users">
        users
      </Link> */}
    </div>
  );
};

export default Menu;
