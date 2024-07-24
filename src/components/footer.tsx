import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-row w-full justify-center px-5 py-3 font-bold bg-black shadow-lg">
      <div className="flex flex-row gap-10">
        <Link to={"/"} className="font-serif text-white">
          Home
        </Link>
        <Link to={"/pokemon"} className="font-serif text-white">
          My Pokemon
        </Link>
      </div>
    </div>
  );
};

export default Footer;
