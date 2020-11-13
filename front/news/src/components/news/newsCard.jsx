import React from 'react';
import { useHistory } from 'react-router-dom';
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
import Chip from '@material-ui/core/Chip';

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
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="news-card" variant="outlined">
      <CardHeader
        avatar={
          <Avatar
            className="news-card__avatar"
            src={data.author_data.avatar}
            onClick={() => history.push(`/user/${data.author_data.id}`)}
          />
        }
        title={data.author_data.full_name}
      />
      <CardMedia
        className="news-card__media"
        image={data.image}
      />
      <CardContent className="news-card__controls">
        <Typography gutterBottom variant="h5" component="h2" className='news-card__title'>
          {data.title}
        </Typography>
        <IconButton
          className={clsx(classes.expand, { 'expandOpen': expanded, })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {data.content.split('\n').map((el, index) => <Typography className="paragraph" paragraph key={index}>{el}</Typography>)}
        </CardContent>
      </Collapse>
      <CardContent className="chips-container">
        {data.tags_data.map((el, index) => <Chip size="small" clickable label={el} key={index} />)}
      </CardContent>
    </Card>
  );
}

NewsCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author_data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      full_name: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    tags_list: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default React.memo(NewsCard);