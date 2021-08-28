import React from 'react';
import { Link } from 'react-router-dom';


interface WelcomeState {
  saidNo: boolean;
}

export default class WelcomeContent extends React.Component<{}, WelcomeState> {
  state: WelcomeState = { saidNo: false }

  render() {
    return (
      <div className="desert desert-down">
        <h1 className="-mt-12">Welcome to my birthday party</h1>
        {!this.state.saidNo && (
          <p className="text-center content">
            Hi there! If you received reference to this page then 
              I want to see you on my birthday. 
              I keep tradition to celebrate a birthday 
              every goddamn year 
              and this year I decided to invite y’all 
              in the web format.
          </p>
        )}
        <div className={`chunk ${this.state.saidNo && "mt-40 sm:mt-60"}`}>
          {!this.state.saidNo ? (
            <em className="emph">Are you going to be???</em>
          ) : (
            <>
              <em className="emph">Are you sure?</em>
              <em className="emph">Read the article and you might change your mind</em>
            </>
          )}
          <div className="btn-box">
            {!this.state.saidNo ? (
              <>
                <Link to="/survey" className="btn btn-pr">Yes</Link>
                <button
                  className="btn btn-sec"
                  onClick={() => this.setState({ saidNo: true })}
                >
                  No
                </button>
              </>
            ) : (
              <Link to="/history" className="btn btn-pr">Read</Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}