import "../../styles/components/home/HomeContaine.scss";
import hereux from "../../assets/hereux.jpg";
import moment from "../../assets/moment.png";
export default function HomeContaine() {
    return (
        <div className="Containte">
            <div>
                <h1 className="Containte-title">
                    Whether you're planning a small gathering or a large celebration, <br /> we have
                    the expertise to make it an unforgettable experience.
                </h1>
            </div>
            <div className="Containte-image">
                <img src={moment} alt="Containte" />
            </div>
        </div>
    );
}
