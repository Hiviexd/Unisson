import "../../styles/components/home/HomeInfo.scss";
import photographe from "../../assets/photographe.jpg";
import traiteur from "../../assets/traiteur.jpg";
import band from "../../assets/band.jpg";
import salle from "../../assets/salle.jpg";
export default function HomeInfo() {
    return (
        <div className="infomain">
            <div className="photoghraphe">
                <h1>photoghraphe</h1>
                <p>You need someone to save ur special moments</p>
                <img src={photographe} alt="photographe" />
            </div>
            <div className="Traiteur">
                <h1>Traiteur</h1>
                <p>You need someone to make all the hadhara ferhanin</p>
                <img src={traiteur} alt="traiteur" />
            </div>
            <div className="Bande">
                <h1>Band musicale</h1>
                <p>You need to share feelings by music in your night</p>
                <img src={band} alt="band" />
            </div>
            <div className="espace">
                <h1>espace</h1>
                <p>You need a nice place where u will enjoy your day</p>
                <img src={salle} alt="salle" />
            </div>
        </div>
    );
}
