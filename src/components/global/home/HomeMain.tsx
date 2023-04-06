import "../../../styles/components/home/HomeMain.scss";
import bg from "../../../assets/bg.png";
export default function HomeMain() {
    return (
        <div className="main">
            <div className="main-title">
                <h1>Lorem ipsum.</h1>
                <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.</h2>
                <button>Get Started</button>
            </div>
            <div className="main-image">
                <img src={bg} alt="main" />
            </div>
               
        </div>
    );
}
