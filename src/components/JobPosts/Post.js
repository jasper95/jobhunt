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
    <Card>
      <CardTitle
        title={(
          <Link href={`/jobs/${post.slug}`}>
            <Button flat children={post.name} />
          </Link>
        )}
        subtitle={(
          <Button flat children={post.company.name} />
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


export default Post