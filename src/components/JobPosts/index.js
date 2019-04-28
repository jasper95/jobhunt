import React from 'react';
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Post from './Post'
import ProfilePost from './ProfilePost'
import Search from '../Search'
import 'sass/components/jobSearch/index.scss'

function JobPosts(props) {
  const { posts, isAdmin } = props
  return (
    <div className='jobSearch'>
      <div className='jobSearch_searchKey'>
        <div className='container'>
          <h1 className='jobSearch_searchKey_title'>
            React Js Practice Jobs
          </h1>
          <h5 className='jobSearch_searchKey_subtitle'>
            90 intern jobs available  
          </h5>
        </div>
      </div>
      <div className='jobSearch_contents'>
        <div className='container'>
          <Grid>
            <Cell
              className='jobSearch_search' 
              size={3}>
              <Search />
            </Cell>
            <Cell 
              className='jobSearch_jobs'
              size={9}>
              <Posts posts={posts} postRenderer={isAdmin ? ProfilePost : Post }/>
            </Cell>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default JobPosts

function Posts(props) {
  const { postRenderer: PostComponent, posts } = props
  if (!posts) {
    return (
      <h1 className='jobSearch_jobs_msg'>
        Server Error
      </h1>
    )
  } else if (posts.length < 1 ) {
    return (
      <h1 className='jobSearch_jobs_msg'>
        No results found
      </h1>
    )
  }
  return (
    <>
      {posts.map(post => (
        <PostComponent key={post.id} post={post}/>
      ))}
    </>
  ) 
}

Post.defaulProps = {
  postRenderer: Post
}
