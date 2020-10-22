import React from 'react';
import '../styles/newsList.css';

export default function NewsList(props) {
  return (
    <div className="news-list">
      {props.children}
    </div>
  );
}