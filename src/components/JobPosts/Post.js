import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link'

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
  console.log('post: ', post);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Link href={`/jobs/${post.slug}`}>
          <Button>
            <Typography className={classes.title} color="textSecondary" gutterBottom children={post.name} />
          </Button>
        </Link>
        <Typography variant="h5" component="h2" children={post.company.name} />
        <Typography className={classes.pos} color="textSecondary" children={formatAddress(post.address_description)} />
        <Typography variant="h5" component="h2" children='Job Description' />
        <Typography component="p" children={extractDescription(post.description)} noWrap/>
      </CardContent>
    </Card>
  );
}

function extractDescription({ blocks }) {
  return blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
}

function formatAddress({ province, municipality }) {
  return [municipality, province].join(', ')
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
