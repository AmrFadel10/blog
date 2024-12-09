import LeftHeader from "./LeftHeader";
import Nav from "./Nav";
import RightHeader from "./RightHeader";

const Header = () => {
  return (
    <header className=" bg-zinc-50/10 relative px-2 shadow py-[6px]">
      <div className="container flex justify-between lg:py-3 mx-auto items-center">
        <LeftHeader />
        <Nav />
        <RightHeader />
      </div>
    </header>
  );
};

export default Header;
