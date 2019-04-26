import React from 'react';
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Post from './Post'
import Search from '../Search'

function JobPosts(props) {
  const { posts } = props
  return (
    <div>
      <Grid>
        <Cell size={3}>
          <Search />
        </Cell>
        <Cell size={9}>
          {posts.map(post => (
            <Post key={post.id} post={post}/>
          ))}
        </Cell>
      </Grid>
    </div>
  );
}

export default JobPosts