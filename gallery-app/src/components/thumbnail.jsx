import React from 'react'

function thumbnail(imgSrc, imgAlt, imgTitle, imgDate) {
  return (
    <div className='thumbnail'>
        <img src={imgSrc} alt={imgAlt} />
        <p><b>{imgTitle}</b></p>
        <p>{imgDate}</p>
    </div>
  )
}

export default thumbnail
