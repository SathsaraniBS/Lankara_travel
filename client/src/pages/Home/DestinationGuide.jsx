import React, { useState, useEffect } from "react";

const DestinationGuide = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/destinations")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center"
      style={{ backgroundImage: "url('/images/backimage2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 p-5">
        <h1 className="text-[3rem] font-bold text-white max-[768px]:text-[2rem]">
          Destination Guide
        </h1>
        <p className="text-2xl text-white mb-5">Holiday in Sri Lanka</p>

        {loading && <p className="text-white text-xl mt-5">Loading destinations...</p>}

        {error && (
          <p className="text-white text-xl mt-5">
            Couldn't load destinations. Is the backend server running?
          </p>
        )}

        {!loading && !error && (
          <div
            className="grid grid-cols-3 gap-[50px] justify-center mt-5 w-[90%] max-w-[1200px]
            max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1"
          >
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="w-[250px] h-[320px] bg-cover bg-center rounded-2xl relative
                transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105
                max-[768px]:w-[180px] max-[768px]:h-[280px]"
                style={{ backgroundImage: `url(${dest.image})` }}
              >
                <div
                  className="absolute bottom-0 w-full bg-black/40 text-white p-3 text-center
                  rounded-b-2xl max-[768px]:p-2"
                >
                  <h2>{dest.name}</h2>
                  <p>{dest.description}</p>
                  <button
                    className="bg-transparent border-none text-white text-xl cursor-pointer mt-[5px]
                    hover:text-[red] active:text-[red] max-[768px]:text-base"
                  >
                    ❤
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationGuide;