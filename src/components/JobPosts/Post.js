import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function Post(props) {
  const { classes, post } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom children={post.title} />
        <Typography variant="h5" component="h2" children={post.company} />
        <Typography className={classes.pos} color="textSecondary" children={post.address} />
        <Typography variant="h5" component="h2" children='Job Description' />
        <Typography component="p" children={post.description} noWrap/>
      </CardContent>
    </Card>
  );
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
