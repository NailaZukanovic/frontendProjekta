import { Card, CardMedia, Typography, CardContent } from '@material-ui/core'
import React from 'react'


const PageNotFound = () => {
    return (
        <Card>
            <CardContent>
        <Typography variant="h2" color="text.secondary">
          Page not found
        </Typography>
      </CardContent>
            <CardMedia
            component="img"
            image="https://i.imgur.com/qIufhof.png"
            alt="Paella dish"
            width="400"
            height="600"
        />
        </Card>
    )
}

export default PageNotFound;