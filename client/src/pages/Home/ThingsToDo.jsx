import React from "react";
import { Search } from "lucide-react";

const ThingsToDo = () => {
  return (
    <div className="relative text-center text-white h-screen flex flex-col justify-center items-center overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/backimage.jpg')" }}
      ></div>

      <div className="flex justify-end w-full p-5 max-[768px]:justify-center max-[768px]:p-2.5">
        <div className="flex items-center bg-white/80 rounded-full px-2.5 py-[5px] h-10 max-[768px]:mt-2.5">
          <Search className="mr-2.5 text-[#333]" size={20} />
          <input
            type="text"
            placeholder="search text"
            className="border-none bg-transparent outline-none max-[768px]:text-sm"
          />
        </div>
      </div>

      <div className="max-w-[600px] p-5 text-xl font-bold max-[768px]:p-2.5">
        <h1 className="max-[768px]:text-2xl">Things to do in Sri Lanka</h1>
        <p className="max-[768px]:text-sm">
          Discover the heart of Sri Lanka—authentic, diverse, and unforgettable.
          Let us help you plan the perfect trip with local insights, expert
          tips, and hidden gems. From where to eat to must-see sights, we've got
          you covered. Your next favorite memory starts here!
        </p>
      </div>
    </div>
  );
};

export default ThingsToDo;