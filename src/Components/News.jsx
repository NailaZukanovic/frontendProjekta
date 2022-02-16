import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShareButton from './ShareButton';

const useStyles = makeStyles({
    root: {
        maxWidth: 340,
    },
    media: {
        height: 180,
    },
});

const News = ({ newsData: { url, image, title, description, author } }) => {
    const [open, setOpen] = React.useState(null);

    const urls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?text=${url}`,
        whatsapp: `whatsapp://send?text=${url}`,
    };

    const handleClick = (e) => {
        if (navigator.share) {
            navigator
                .share({
                    title: 'Share this news',
                    url,
                })
                .then(() => console.log('shared news'))
                .catch(() => console.log('something is wrong'));
            return;
        }
        setOpen(e.currentTarget);
    };

    const handleClose = (url) => {
        window.open(url);
        setOpen(null);
    }
    const classes = useStyles();
    const openNews = (url) =>
        setTimeout(() => {
            window.open(url);
        }, 150);

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => openNews(url)}>
                <CardMedia className={classes.media} image={image} title={title} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {/* <ShareButton url={url} /> */}
                {/* <Button size="small" color="primary" onClick={() => openNews(url)}>
                    Read More
                </Button> */}
                {/* <Button size="small" color="secondary" onClick={() => openNews(url)}>Read More</Button> */}
                <Button size="small" color="secondary" onClick={() => openNews(urls.facebook)}>Facebook</Button>
                <Button size="small" color="secondary" onClick={() => openNews(urls.twitter)}>Twitter</Button>
                <Button size="small" color="secondary" onClick={() => openNews(urls.whatsapp)}>Whatsapp</Button>
            </CardActions>
        </Card>
    );
};

export default News;