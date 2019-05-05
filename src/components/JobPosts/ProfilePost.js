import React from 'react';
import Card from 'react-md/lib/Cards/Card'
import Link from 'next/link'
import capitalize from 'lodash/capitalize'
import { getFileLink } from 'lib/tools'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import ImageLoader from 'react-image'
import { formatAddress } from './Post'

import 'sass/components/userCard/index.scss'

function ProfilePost(props) {
  const { post } = props;
  const displayName = [post.first_name, post.last_name].join(' ')
  const [lastSchoolAttended] = post.educations
  const { skills } = post
  return (
    <Card className='userCard'>
      <div className='userCard_avatar'>
        <div className='userCard_avatar_container'>
          <ImageLoader
            className='userCard_avatar_src'
            src={[getFileLink({ type: 'avatar', node: 'user', id: post.id }), '/static/img/default-avatar.png']}
          />
        </div>
      </div>
      <div className='userCard_info'>
        <Link href={`/user/${post.id}`}>
          <a className='userCard_info_name'>
            { displayName }
          </a>
        </Link>
        <h5 className='userCard_info_address'>
          <FontIcon>place</FontIcon>
          <span className="name">
            {formatAddress(post.address_description) || 'Address Not Available'}
          </span>
        </h5>
        <div className='userCard_info_moreInfo'>
          <label>Skills</label>
          {skills.length > 0 && (
            <p className='info'>
              {skills.map(e => capitalize(e.name)).join(', ')}
            </p>
          )}
        </div>
        <div className='userCard_info_moreInfo'>
          <label>Last School Attended</label>
          <p className='info'>{lastSchoolAttended.school}</p>
          <p className='info'>{lastSchoolAttended.category}</p>
        </div>
      </div>
    </Card>
  );
}

export default ProfilePost