export default function HomeContent(props: {loggedIn: boolean}) {
  return (
    <div className="desert desert-down">
      <em className="emph content">
        {props.loggedIn ?
          "No any information yet" :
          "This page is available only for logged in users:^)"
        }
      </em>
    </div>
  );
}