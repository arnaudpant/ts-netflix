import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { BsFillCaretRightSquareFill } from "react-icons/bs";
import { BsFillCaretLeftSquareFill } from "react-icons/bs";
import { BsFilePlayFill } from "react-icons/bs";
import { IMAGE_URL_ORIGINAL } from '../utils/config';


export default function MediaControlCard({ movie }: any) {
    const theme = useTheme();

    const buildImagePath = (movie: any) => {
        const image = movie?.backdrop_path
        return `${IMAGE_URL_ORIGINAL}${image}`
    }

    return (

        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {
                            movie?.title ? `${movie.title}` : `${movie?.name}`
                        }
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <BsFillCaretRightSquareFill /> : <BsFillCaretLeftSquareFill />}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <BsFilePlayFill sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <BsFillCaretLeftSquareFill /> : <BsFillCaretRightSquareFill />}
                    </IconButton>
                </Box>
            </Box>
            {
                movie && <CardMedia
                    component="img"
                    sx={{ width: 220 }}
                    image={`${buildImagePath(movie)}`}
                    alt="movie.title"
                />
            }

        </Card>
    );
}