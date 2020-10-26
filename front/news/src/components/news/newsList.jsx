import React from 'react';
import './newsList.css';

export default function NewsList(props) {
  return (
    <div className="news-list">
      {props.children}
    </div>
  );
}