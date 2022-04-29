const Header = () => {
  return (
    <div className="w-100 flex items-end justify-between p-5 bg-blue-300 border-b-4 border-blue-400 shadow">
      <h1 className="text-4xl font-bold text-white font-serif">
        🌤 The Weather App
      </h1>
      <small className="invisible sm:visible text-xs text-blue-600">
        © 2022 BQ
      </small>
    </div>
  );
};

export default Header;
