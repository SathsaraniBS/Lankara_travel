import { Button } from "./Button";
import "./Herosection.css";

function Herosection() {
    return (
        <div className="hero-container">
            <video src="/videos/246462_small.mp4" autoPlay loop muted></video>
            <h1>Ceylon Compass</h1>
            <h3>PLAN YOUR NEXT TRIP</h3>
            <div className="hero-btns">
                <Button
                    className="btn"
                    buttonStyle="btn--outline"
                    buttonSize="btn--large"
                >
                    Planning a Trip
                </Button>
                {/*<Button
                    className="btn"
                    buttonStyle="btn--primary"
                    buttonSize="btn--large"
                >
                    WATCH TRAILER <i className="far fa-play-circle" />
                </Button>    */  }          
            </div>            
        </div>
    );
}

export default Herosection
