import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
// import CardActions from 'react-md/lib/Cards/CardActions'
import Link from 'next/link'

import 'sass/components/jobCard/index.scss'


function Post(props) {
  const { post } = props;
  return (
    <Card className='jobCard'>
      <Link href={`/jobs/${post.slug}`}>
        <h1 className='jobCard_jobTitle'>
            { post.name }
        </h1>
      </Link>

      <h2 className='jobCard_company'>
        { post.company.name }
      </h2>

      <p className='jobCard_address'>
        <FontIcon>place</FontIcon>
        <span className="name">
          {formatAddress(post.address_description)}
        </span>
      </p>

      <div className='jobCard_description'>
        <label>Job Description</label>
        <p>{extractDescription(post.description)}</p>
      </div>

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