import React from 'react';
import Card from 'react-md/lib/Cards/Card'
import Link from 'next/link'
import ImageLoader from 'components/ImageLoader'
import capitalize from 'lodash/capitalize'
import { getFileLink } from 'lib/tools'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import { formatAddress } from './Post'

import 'sass/components/jobCard/index.scss'

function ProfilePost(props) {
  const { post } = props;
  const displayName = [post.first_name, post.last_name].join(' ')
  const [lastSchoolAttended] = post.educations
  const { skills } = post
  console.log('post: ', post);
  return (
    <Card className='jobCard'>
      <Link href={`/user/${post.id}`}>
        <a>
          <h1 className='jobCard_jobTitle'>
            { displayName }
          </h1>
        </a>
      </Link>
      <div className='jobCard_address'>
        <FontIcon>place</FontIcon>
        <span className="name">
          {formatAddress(post.address_description) || 'Address Not Available'}
        </span>
      </div>
      <div className='nav_profile_avatar'>
        <ImageLoader
          fallback='/static/img/default-avatar.png'
          src={getFileLink({ type: 'avatar', node: 'user', id: post.id })}
        />
      </div>
      {skills.length > 0 && (
        <div>
          <span>Skills</span>
          <p>{skills.map(e => capitalize(e.name)).join(', ')}</p>
        </div>
      )}
      {lastSchoolAttended && (
        <div>
          <span>Last School Attended</span>
          <p>{lastSchoolAttended.school}</p>
          <p>{lastSchoolAttended.category}</p>
        </div>
      )}
    </Card>
  );
}

export default ProfilePost