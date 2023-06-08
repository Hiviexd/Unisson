import "../../styles/components/home/HomeDesc.scss";
import events from "../../assets/events.jpg";
export default function HomeDesc() {
    return (
        <div className="Desc">
            <div>
                <h1 className="Desc-title">
                    Let us take the stress out of event planning <br /> so that you can enjoy your
                    special day to the fullest.
                </h1>
                <h3 className="cc">
                    {" "}
                    We value transparency and strive to provide clear and accurate information to
                    our clients
                </h3>
            </div>
            <div className="Desc-image">
                <img src={events} alt="Desc" />
            </div>
        </div>
    );
}
