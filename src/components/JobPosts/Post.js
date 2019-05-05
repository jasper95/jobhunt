import React from 'react';
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import Card from 'react-md/lib/Cards/Card'
import Link from 'next/link'

import 'sass/components/jobCard/index.scss'


function Post(props) {
  const { post } = props;
  const { company } = post
  return (
    <Card className='jobCard'>
      <Link href={`/jobs/${post.slug}`}>
        <h1 className='jobCard_jobTitle'>
            { post.name }
        </h1>
      </Link>

      <Link href={`/company/${company.slug}`}>
        <h2 className='jobCard_company'>
          { company.name }
        </h2>
      </Link>

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

export function extractDescription({ blocks }) {
  return blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
}

export function formatAddress({ province, municipality }) {
  return [municipality, province].filter(Boolean).join(', ')
}


export default Post