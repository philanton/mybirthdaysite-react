import React from 'react';


interface HomeProps {
  loggedIn: boolean;
}

export default class HomeContent extends React.Component<HomeProps> {
  render() {
    return (
      <div className="desert desert-down">
        <em className="emph content">
          {this.props.loggedIn ?
            "No any information yet" :
            "This page is available only for logged in users:^)"
          }
        </em>
      </div>
    );
  }
}