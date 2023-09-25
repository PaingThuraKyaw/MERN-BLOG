const Navbar = () => {
  return (
    <div className=" flex items-center justify-between mt-5 px-8">
      <h2 className=" text-3xl font-semibold ">Logo</h2>
      <div>
        <ul className=" flex items-center space-x-5">
          <li className=" text-slate-800 font-[500]">Home</li>
          <li className=" text-slate-800 font-[500]">Login</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
