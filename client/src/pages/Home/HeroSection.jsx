import { Button } from "../../components/Button";

function HeroSection() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.2)]">
      <video
        src="/videos/246462_small.mp4"
        autoPlay
        loop
        muted
        className="object-cover w-full h-full fixed -z-10 top-0 left-0"
      ></video>

      <h1 className="text-white text-[100px] -mt-[100px] max-[960px]:text-[70px] max-[960px]:-mt-[150px] max-[768px]:text-[50px] max-[768px]:-mt-[100px]">
        Ceylon Compass
      </h1>

      <h3
        className="mt-2 text-white text-[32px] max-[768px]:text-[25px]"
        style={{
          fontFamily:
            "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
        }}
      >
        PLAN YOUR NEXT TRIP
      </h3>

      <div className="mt-8">
        <Button
          className="btn"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Planning a Trip
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;