import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './newsCard.css';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

function NewsCard({ data }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Card className="news-card" variant="outlined">
      <CardHeader
        avatar={
          <Avatar className="news-card__avatar">
            {data.author_data.id}
          </Avatar>
        }
        title={data.author_data.username}
      />
      <CardMedia
        className="news-card__media"
        image={`/img/${data.image || 'noImage.jpg'}`}
      />
      <CardContent className="news-card__controls">
        <Typography gutterBottom variant="h5" component="h2" className='news-card__title'>
          {data.title}
        </Typography>
        <IconButton
          className={clsx(classes.expand, {'expandOpen': expanded,})}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {data.content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

NewsCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author_data: PropTypes.number.isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    tags_list: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default React.memo(NewsCard);