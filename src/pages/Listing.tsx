import Navbar from "../components/global/Navbar";
import photographe from "../assets/photographe.jpg";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";

export default function listing() {
    return (
        <div>
            <Navbar />
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia sx={{ height: 250 }} image={photographe} title="" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Hamdi Yaakoubi Photography{" "}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Let me capture the special moments of your life. Are you
                        looking to capture beautiful memories of your special
                        moments? Look no further! As a professional
                        photographer, I offer a range of services to meet your
                        unique needs. Whether you need stunning portraits,
                        wedding photos, or commercial images, I can provide you
                        with high-quality, creative, and personalized
                        photography services. With years of experience and a
                        passion for capturing the beauty in every moment, you
                        can trust that I will produce images that you will
                        cherish for a lifetime. Contact me today to schedule
                        your session and let's create something beautiful
                        together!
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    );
}
