import React from 'react';

const YoutubeFrame = ({ embedId, width, height }) => {
    return (
        <div className="video-responsive">
            <iframe
            width={width} 
            height={height} 
            src={`https://www.youtube.com/embed/${embedId}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            />
      </div>
    );
};

export default YoutubeFrame;