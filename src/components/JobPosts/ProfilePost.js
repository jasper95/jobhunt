import React from 'react';
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import Card from 'react-md/lib/Cards/Card'
import Link from 'next/link'

import 'sass/components/jobCard/index.scss'

function ProfilePost(props) {
  const { post } = props;
  const displayName = [post.first_name, post.last_name].join(' ')
  const [lastSchoolAttended] = post.educations
  console.log('lastSchoolAttended: ', lastSchoolAttended);
  return (
    <Card className='jobCard'>
      <Link href={`/user/${post.id}`}>
        <a>
          <h1 className='jobCard_jobTitle'>
            { displayName }
          </h1>
        </a>
      </Link>

      <div>
        <span>Last School Attended</span>
        
      </div>
      {/* <h2 className='jobCard_company'>
        { post.company.name }
      </h2> */}

      {/* <p className='jobCard_address'>
        <FontIcon>place</FontIcon>
        <span className="name">
          {formatAddress(post.address_description)}
        </span>
      </p> */}

      {/* <div className='jobCard_description'>
        <label>Job Description</label>
        <p>{extractDescription(post.description)}</p>
      </div> */}

    </Card>
  );
}

// function extractDescription({ blocks }) {
//   return blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
// }

// function formatAddress({ province, municipality }) {
//   return [municipality, province].join(', ')
// }


export default ProfilePost