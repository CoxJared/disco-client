import React, { Component } from 'react';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        height: 300,
        width: 900,
        marginTop: 50,
        marginLeft: 100
    },
    albumImage: {
        width: 270
    },
    albumInfo: {
        width: 570,
        height: 260,
        marginLeft: 20,
        backgroundColor: '#212122',
        padding: '5px 15px',
        borderRadius: 10
    },
    albumName: {
        color: '#fff',
        fontSize: 45,
        fontWeight: 450
    },
    artist: {
        fontSize: 20
    },
    albumText: {
        color: '#bbb'
    },
    tracks: {
        width: 900,
        marginTop: 20
    },
    track: {
        height: 20,
        width: 900,
        borderBottom: '1px solid #555',
        padding: '12px 0'
    },
    trackNumber: {
        display: 'inline',
        fontSize: 20,
        fontWeight: 200,
        color: '#aaa',
        marginRight: 10
    },
    trackName: {
        display: 'inline',
        fontWeight: 300,
        fontSize: 20,
        color: '#aaa'
    },
    trackLength: {
        display: 'inline',
        float: 'right',
        fontWeight: 200,
        // top: 0,
        textAlign: 'right',
        width: 300,
        fontSize: 20,
        color: '#aaa'
    }
});

const _api_key = process.env.REACT_APP_LASTFM_API_KEY;

export class album extends Component {
    constructor(props) {
        super(props);
        const { album, artist } = props.location.state;
        this.state = {};
        this.getInfoFromApiRequest(album, artist);
    }

    async getInfoFromApiRequest(albumName, artist) {
        const ROOT_URL = 'http://ws.audioscrobbler.com';
        const ALBUM_URL = `${ROOT_URL}/2.0/?method=album.getinfo&api_key=${_api_key}&artist=${artist}&album=${albumName}&format=json`;
        const response = await fetch(ALBUM_URL);
        if (response.ok) {
            const data = await response.json();
            this.setState({
                album: data.album
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { album } = this.state;

        if (album) {
            console.log(album);
            let image = album.image.find((img) => img.size === 'mega')['#text'];

            const songs = album.tracks.track.map((song, i) => (
                <div className={classes.track}>
                    <h1 className={classes.trackNumber}>{i}</h1>
                    <h1 className={classes.trackName}>{song.name}</h1>
                    <h1 className={classes.trackLength}>
                        {Math.floor(song.duration / 60)}:
                        {String(song.duration % 60).split('').length === 2
                            ? song.duration % 60
                            : '0' + (song.duration % 60)}
                    </h1>
                </div>
            ));

            return (
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.container}
                >
                    <img className={classes.albumImage} src={image} />
                    <Paper className={classes.albumInfo}>
                        <Typography className={classes.albumName}>
                            {album.name}
                        </Typography>
                        <Typography className={classes.artist} color="primary">
                            {album.artist}
                        </Typography>
                        <Typography className={classes.albumText}>
                            listeners: {album.listeners}
                        </Typography>
                        <Typography className={classes.albumText}>
                            playcount: {album.playcount}
                        </Typography>
                    </Paper>
                    <div className={classes.tracks}>{songs}</div>
                </Grid>
            );
        } else {
            return <div />;
        }
    }
}

export default withStyles(styles)(album);
