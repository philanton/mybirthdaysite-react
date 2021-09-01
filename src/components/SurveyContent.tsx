import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header';

const SurveyContent: React.FC<{}> = () => {
  const history = useHistory();
  const handleSubmit: () => void = () => history.push('/survey-home');

  return (
    <>
      <Header />
      <div className="desert desert-up">
        <div className="content">
          <h2 id="title">Survey</h2>
          <div className="chunk" id="description">
            <p className="paragraph">
              If you are here then you said “Yes” 
              and then I want you to take survey below, 
              so that your time won’t be wasted!
            </p>
            <p className="paragraph">
              Sometimes there are some optional input fields, but not this time.
            </p>
            <em className="emph">
              Please fill in all input fields.
            </em>
          </div>
          <form id="survey-form" onSubmit={handleSubmit}>
            <div className="chunk">
              <label
                className="lbl"
                htmlFor="name"
                id="name-label"
              >
                Your name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Anton"
                required
              />
            </div>
            <div className="chunk">
              <label
                className="lbl"
                htmlFor="email"
                id="email-label"
              >
                Your email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="myname@example.com"
                required
              />
            </div>
            <div className="chunk">
              <label
                className="lbl"
                htmlFor="age"
                id="number-label"
              >
                Your age:
              </label>
              <input
                type="number"
                id="number"
                name="age"
                min="18"
                max="30"
                placeholder="18 - 30"
                required
              />
            </div>
            <div className="chunk">
              <label className="lbl" htmlFor="">
                Are you a drinker?
              </label>
              <div className="flex flex-wrap">
                <div>
                  <input type="radio" id="alco" name="alco" value="yes" checked />
                  <label htmlFor="alco">Yes</label>
                </div>
                <div>
                  <input type="radio" id="nalco" name="alco" value="no" />
                  <label htmlFor="nalco">No</label>
                </div>
              </div>
            </div>
            <div className="chunk">
              <label className="lbl" htmlFor="">
                What do you like to drink?
              </label>
              <div className="flex flex-wrap">
                  <div>
                    <input type="checkbox" id="beer" name="beer" value="beer" />
                    <label htmlFor="beer">Beer</label>
                  </div>
                  <div>
                    <input type="checkbox" id="vodka" name="vodka" value="vodka" />
                    <label htmlFor="vodka">Vodka</label>
                  </div>
                  <div>
                    <input type="checkbox" id="whiskie" name="whiskie" value="whiskie" />
                    <label htmlFor="whiskie">Whiskie</label>
                  </div>
                  <div>
                    <input type="checkbox" id="wine" name="wine" value="wine" />
                    <label htmlFor="wine">Wine</label>
                  </div>
                  <div>
                    <input type="checkbox" id="gin" name="gin" value="gin" />
                    <label htmlFor="gin">Gin</label>
                  </div>
              </div>
            </div>
            <div className="chunk">
              <label className="lbl" htmlFor="live">
                Where do you currently live?
              </label>
              <select name="live" id="dropdown" value="0">
                <option value="0">Outskirts</option>
                <option value="1">Center</option>
                <option value="2">Left bank</option>
                <option value="3">Right bank</option>
              </select>
            </div>
            <div className="chunk">
              <label className="lbl" htmlFor="wishes">
                Do you have any additional wishes?
              </label>
              <textarea
                name="wishes"
                id="wishes"
                placeholder="Type something..."
                required
              ></textarea>
            </div>
            <div className="chunk">
              <button type="submit" className="btn btn-pr float-right">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SurveyContent;