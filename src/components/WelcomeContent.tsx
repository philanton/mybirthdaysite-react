import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function WelcomeContent() {
  const [saidNo, setSaidNo] = useState(false);

  return (
    <div className="desert desert-down">
      <h1 className="-mt-12">Welcome to my birthday party</h1>
      {!saidNo && (
        <p className="text-center content">
          Hi there! If you received reference to this page then 
            I want to see you on my birthday. 
            I keep tradition to celebrate a birthday 
            every goddamn year 
            and this year I decided to invite y’all 
            in the web format.
        </p>
      )}
      <div className={`chunk ${saidNo && "mt-40 sm:mt-60"}`}>
        {!saidNo ? (
          <em className="emph">Are you going to be???</em>
        ) : (
          <>
            <em className="emph">Are you sure?</em>
            <em className="emph">Read the article and you might change your mind</em>
          </>
        )}
        <div className="btn-box">
          {!saidNo ? (
            <>
              <Link to="/survey" className="btn btn-pr">Yes</Link>
              <button
                className="btn btn-sec"
                onClick={() => setSaidNo(true)}
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