import React from 'react'
import checkAuth from '../utils/checkAuth'
import Header from './Header'

const HomeContent: React.FC<{}> = props => {
  return (
    <>
      <Header />
      <div className="desert desert-down">
        <em className="emph content">
          {checkAuth() ?
            "No any information yet" :
            "This page is available only for logged in users:^)"
          }
        </em>
      </div>
    </>
  );
}

export default HomeContent;