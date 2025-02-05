import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material';
import React from 'react';
import { getIn } from 'yup/lib/util/reach';
import { useNavigate } from 'react-router-dom';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export function getIngredients(data: any){
    let ingredients: string[] = [];
    for (let i = 1; i < 16; i++) {
        if (data.data[`strIngredient${i}`])
            ingredients.push(data.data[`strIngredient${i}`])
    }
    return ingredients;
}

function RecipeCard(data: any) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const navigate = useNavigate();

    const handleModify = () => {
        if (data.data.idDrink) {
            navigate('/recipe', { state: {id: 0, idDrink: data.data.idDrink}});
        }
        else {
            navigate('/recipe', { state: {id: data.data.id, idDrink: 0}});
        }
    }

    let ingredients: string[] = getIngredients(data);

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader title={data.data.strDrink} />
            {(data.data.strDrinkThumb || data.data.image_id) && <CardMedia
                component="img"
                height="194"
                image={data.data.strDrinkThumb || `http://localhost:3001/image/display?imageId=${data.data.image_id}`}
                alt=""
            />}
            <CardContent>
                Ingredients: {ingredients}
            </CardContent>
            <CardActions disableSpacing>
                <button onClick={handleModify}>Modify</button>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Recipe:</Typography>
                    <Typography paragraph>
                        {data.data.strInstructions}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default RecipeCard;
