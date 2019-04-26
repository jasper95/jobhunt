import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
// import CardActions from 'react-md/lib/Cards/CardActions'
import Link from 'next/link'


function Post(props) {
  const { post } = props;
  return (
    <Card className={classes.card}>
      <CardTitle
        title={(
          <Link href={`/jobs/${post.slug}`}>
            <Button flat children={post.name} />
          </Link>
        )}
        subtitle={(
          <Link>
            <Button flat children={post.company.name} />
          </Link>
        )}
      />
      <CardText className="cards__weather__temperature">
        <h3 className="md-display-4">{formatAddress(post.address_description)}</h3>
        <p>{extractDescription(post.description)}</p>
      </CardText>
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

export default Post