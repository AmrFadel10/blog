import { Link } from "react-router-dom";

const LeftHeader = () => {
  return (
    <div className="flex gap-3 items-center">
      <Link to={"/"}>
        <img
          src="/logo.png"
          alt="img"
          className="md:w-8 w-7  md:h-8 h-7 hover:opacity-85"
        />
      </Link>
    </div>
  );
};

export default LeftHeader;
