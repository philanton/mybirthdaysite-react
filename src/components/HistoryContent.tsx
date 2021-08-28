import { Link } from 'react-router-dom';

export default function HistoryContent() {
  return (
    <div className="desert desert-up">
      <div className="content">
        <h2>History</h2>
        <div className="chunk">
          <p className="paragraph">
            First of all, a little history and why it has become a tradition at all.
          </p>
          <p className="paragraph">
            The organization of such event includes many nuances, 
            so many people spend time either with their family 
            or let themselves go with the flow.
          </p>
          <p className="paragraph">
              For me, the organization was not always easy, 
              but I always enjoyed it in spite of 
              the money, time and effort spent.
          </p>
          <p className="paragraph">
              This tradition does not last so long, but I made the decision to keep it.
          </p>
          <img
            src={require("../img/birthday_tradition.jpg").default}
            className="image"
            alt=""
          />
        </div>
        <div className="chunk">
          <div className="flex flex-col sm:flex-row my-12">
            <p className="paragraph my-12 sm:my-0">
              On average, preparation always took a week, 
              but this is taking into account the fact 
              that the whole plan is already ready 
              and all that remains is to implement it.
            </p>
            <img
              src={require("../img/event_preparation.jpg").default}
              className="h-auto sm:h-96 ml-0 sm:ml-12 image"
              alt=""
            />
          </div>
          <p className="paragraph">
            There were always a couple of friends 
            who helped with everything. 
            Shopping for groceries sometimes turned out to be 
            the most difficult task, 
            but it was easier and more fun 
            thanks to those friends.
          </p>
        </div>
        <div className="chunk">
          <p className="paragraph">
              When that day comes, 
              my head always stops working 
              and I just start to go with the flow 
              of what was prepared.
          </p>
          <div className="flex flex-wrap justify-between my-12">
            <p className="paragraph w-full sm:w-7/12 mb-6 mt-0 sm:my-0">
                Then the time comes 
                when all the people gather in one place, 
                which turns into complete nonsense: 
                someone does not know where and how to get there, 
                someone asks a bunch of stupid questions, 
                and then some kind of individual remains, 
                which everyone else is waiting for.
            </p>
              <img
                src={require("../img/arm_head.jpg").default}
                className="h-60 sm:h-80 mr-6 sm:mr-12 image"
                alt=""
              />
              <p className="paragraph w-1/3 sm:w-full my-0 sm:mt-12 sm:mb-0">
                Because of this, 
                I began to take with me a bottle of something 
                of an average strength of alcohol.
              </p>
          </div>
        </div>
        <div className="chunk">
          <p className="paragraph">
            Well, then endless conversations begin about anything, 
            disputes about playing music 
            and responsibility for cooking barbecue.
          </p>
          <img
            src={require("../img/happy_party.jpg").default}
            className="image"
            alt=""
          />
          <p className="paragraph">
            In general, this is a rest that does not end until everyone turns off.
          </p>
          <p className="paragraph">
            And in the end, it’s time to go.
          </p>
        </div>
        <div className="chunk">
          <p className="paragraph">
            It would seem that this can be done on any day, 
            and what is the point of all these efforts, 
            but these memories and emotions, 
            it's worth it...
          </p>
          <img
            src={require("../img/memories.jpg").default}
            className="image w-full"
            alt=""
          />
        </div>
          <div className="chunk">
            <em className="emph">Click button below, </em>
            <em className="emph">If after reading you want to go</em>
            <div className="btn-box">
              <Link to="/survey" className="btn btn-pr">Take survey</Link>
            </div>
          </div>
        </div>
    </div>
  );
}