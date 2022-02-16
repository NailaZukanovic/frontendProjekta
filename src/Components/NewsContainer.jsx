import React, {useState, useEffect} from 'react';
import News from './News';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import { MeteorRainLoading } from 'react-loadingg';
import Autocomplete from '@mui/material/Autocomplete';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 40,
    },
    item: {
        marginBottom: 30,
    }
}));
const NewsContainer = () => {
    const classes = useStyles();
    const [category, setCategory] = useState('general');
    const [news, setNews] = useState([]);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState({});
    const top100Films = [
        "general",
        "business",
        "programming",
        "entertainment",
        "health",
        "science",
        "sports",
        "technology",
        "gadgets",
        "game",
        "security"
      ];
    useEffect(() => {
        if (category === '') return;
        setLoading({
            status: true,
            maxPercent: 80,
        });
        const getData = async () => {
            const url = `https://api.currentsapi.services/v1/latest-news?apiKey=Iv0ingCnOq7YDglaNcaU8Lnz8iHVNygfdHIyH_aVypU0J_WT&category=${category}`;
  
            const response = await fetch(url).catch(() => setLoading({
                status: true,
                maxPercent: 100,
            }));
            const data = await response.json();
            
            console.log(data);
            setLoading({
                status: true,
                maxPercent: 100,
            });

            if(data.news.lenght == 0)
            {
                setError(true);
            }
            // if (data.news.length) {
            //     setError(false);
            // } else {
            //     setError(true);
            //     setLoading({
            //         status: false,
            //         maxPercent: 0,
            //     });
            // }
            if(data)
            {
                setLoading({
                    status: false,
                    maxPercent: 0
                })
                setError(false);
            }
  
            setNews(data.news);
        };
        setNews([]);
        getData();
    }, [category]);

    const handleChange = (event) => {
        setCategory(event.target.value);
      };
    return (
            <>
                <Grid className={classes.root} container justify={'space-evenly'}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField
                        {...params}
                        id="outlined-name"
                        label="Enter category"
                        value={category}
                        onChange={handleChange} />}
                    />
                </Grid>
            <Grid className={classes.root} container justify={'space-evenly'}>
                {news.map((newsData) =>
                    newsData.image !== 'None' ? (
                        <Grid className={classes.item} item key={newsData.url}>
                            <News newsData={newsData} />
                        </Grid>
                    ) : null
                )}
            </Grid>
            <Grid cointainer>{loading.status &&  <MeteorRainLoading/>}</Grid>
            </>
    );
};

export default NewsContainer;