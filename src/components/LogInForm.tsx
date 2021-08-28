import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";

export default function LogInForm(props: { setLoggedIn: (value: boolean) => void }) {
  const history = useHistory();
  const [email, setEmail] = useState(localStorage.getItem('email') || "");
  const [password, setPassword] = useState(localStorage.getItem('password') || "");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = () => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    props.setLoggedIn(true);
    history.push('/home');
  }

  return (
    <div className="desert desert-up">
      <div className="content">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
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
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="chunk">
            <label
              className="lbl"
              htmlFor="password"
              id="password-label"
            >
              Your password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="chunk">
            <button type="submit" className="btn btn-pr float-right">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}