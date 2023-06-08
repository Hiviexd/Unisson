import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import "../../styles/components/home/Last.scss";
import photographe from "../../assets/photographe.jpg";
import band from "../../assets/band.jpg";
import salle from "../../assets/salle.jpg";
import traiteur from "../../assets/traiteur.jpg";

export default function Last() {
    return (
        <div>
            <h1>Our services</h1>
            <div className="services">
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia sx={{ height: 250 }} image={photographe} title="" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Photographe
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            You need someone to save ur special moments by images that tell stories
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>

                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia sx={{ height: 250 }} image={traiteur} title="" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Traiteur
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            You need someone to take care of the food and beverage aspect .
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia sx={{ height: 250 }} image={band} title="" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Band
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            You need to share feelings by different music in your night
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia sx={{ height: 250 }} image={salle} title="" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Espace
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            You need a nice place where u will enjoy your special day
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}
