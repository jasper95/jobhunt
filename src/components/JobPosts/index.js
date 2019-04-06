import React from 'react';
import Grid from '@material-ui/core/Grid';
import Post from './Post'
import Search from '../Search'

function JobPosts(props) {
  const { posts } = props
  return (
    <div>
      <Grid container>
        <Grid item xs={3}>
          <Search />
        </Grid>
        <Grid item xs={9}>
          {posts.map(post => (
            <Post key={post.id} post={post}/>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default JobPosts