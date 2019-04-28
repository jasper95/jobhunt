import React, { useState } from 'react'
import pick from 'lodash/pick'

function ImageLoader(props) {
  const { src, loading, fallback } = props
  const [imgSrc, setImgSrc] = useState(src)
  return (
    <img
      src={imgSrc}
      {...pick(props, 'alt', 'className')}
      onError={() => {
        setImgSrc(fallback)
      }}
    />
  )
}

ImageLoader.defaultProps = {
  loading: (<div>Loading...</div>)
}

export default ImageLoader

