import Navbar from "../components/global/Navbar";
import photographe from "../assets/photographe.jpg";
import achraf from "../assets/achraf.jpg";
import ramzi from "../assets/ramzi.jpg";
import rachide from "../assets/rachide.jpg";
import hamdi from "../assets/hamdi.jpg";
import TRIBUS from "../assets/TRIBUS.png";
import mawazine from "../assets/mawazine.jpg";
import masmoudii from "../assets/masmoudii.jpg";
import trabelsi from "../assets/trabelsi.jpg";

import "../styles/pages/listing.scss";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Checkbox,
    FormControlLabel,
    FormGroup,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

export default function listing() {
    return (
        <div className="checkk">
            <Navbar />

            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Box bgcolor="skyblue" flex={1} p={2} className="sidebar">
                <input
            type="text"
        placeholder="Search here "
       
      />
                    <div className="ooo">
              
              
                        <label>
                            <input type="checkbox" name="Photographe" />
                            Photographe{" "}
                        </label>
                        <label>
                            <input type="checkbox" name="Espace de fete " />
                            Espace de fete{" "}
                        </label>
                        <label>
                            <input type="checkbox" name="Band" />
                            Band{" "}
                        </label>
                        <label>
                            <input type="checkbox" name="Traiteur" />
                            Traiteur{" "}
                        </label>
                        </div>
                        <Button variant="contained">Filtrer </Button>
                    
                </Box>
                <Box className="posts" flex={6} p={2}>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={hamdi}
                            title=""
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div">
                                Hamdi Yaakoubi Photography{" "}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Contact me to schedule your session and let's
                                create something beautiful together!
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={achraf}
                            title=""
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div">
                                Achraf Maalel
                                <br />
                                Photography{" "}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                N'hésitez pas à me contacter pour réserver votre
                                séance photo.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={rachide}
                            title=""
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div">
                                Med Rachid <br />
                                Photography{" "}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                " Offre spéciale pour immortaliser vos souvenirs
                                avec des images mémorables ."
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={ramzi}
                            title=""
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div">
                                Ramzi Jbali <br />
                                Photography{" "}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                "maanduch hte 3ala9e b taswir ema u can enjoy
                                your day with him ."
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={mawazine}
                            title=""
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div">
                                Mawazine Salle de fete
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                "The Best place where u can feel comfortable and
                                special "
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={TRIBUS}
                            title=""
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div">
                                TRIBUS{" "}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                "Don't be worry your night will be perfect with
                                us "
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={masmoudii}
                            title=""
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div">
                                Masmoudi{" "}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                "all u need about food you will find it here."
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={trabelsi}
                            title=""
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div">
                                Troupe Trabelsi{" "}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                "we will make your night memorable with a great
                                atmosphere "
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Stack>
        </div>
    );
}
