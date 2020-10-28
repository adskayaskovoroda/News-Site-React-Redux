import React from 'react';
import './newsList.css';

function NewsList(props) {
  return (
    <div className="news-list">
      {props.children}
    </div>
  );
}

export default React.memo(NewsList);