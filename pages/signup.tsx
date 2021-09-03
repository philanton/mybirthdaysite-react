import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from "next/router"
import goTrueClient from '../utils/auth'

export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [minLenOk, setMinLenOk] = useState(false);
  const [numOneOk, setNumOneOk] = useState(false);
  const [lowerOk, setLowerOk] = useState(false);
  const [upperOk, setUpperOk] = useState(false);
  const [symbolOk, setSymbolOk] = useState(false);
  const [matchOk, setMatchOk] = useState(false);

  const checkValidPassword = () => {
    setMinLenOk(!(password.length < 8));
    setNumOneOk(/\d/.test(password));
    setLowerOk(/[a-z]/.test(password));
    setUpperOk(/[A-Z]/.test(password));
    setSymbolOk(/^[0-9A-z]+$/.test(password));
    setMatchOk(passwordC === password);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handlePasswordCChange = (e: ChangeEvent<HTMLInputElement>) => setPasswordC(e.target.value);
  useEffect(() => checkValidPassword(), [password, passwordC]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (minLenOk && numOneOk && lowerOk &&
      upperOk && symbolOk && matchOk) {
      const { error } = await goTrueClient.signUp({ email, password });
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      setErrorMessage("");
      router.push('/');
    }
  }

  return (
    <div className="desert desert-up">
      <div className="content">
        <h2>Sign Up</h2>
        <Link href="/login">
          <a className="btn btn-sec w-full mx-0 sm:mx-0 my-10 sm:my-20">
            Click here if you've already have an account.
          </a>
        </Link>
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
              placeholder="myname@example.com"
              onChange={handleEmailChange}
              value={email}
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
            <ul className="requirements-list">
              <li className={minLenOk ? "ok" : "not-ok"}>Minimum length - 8 characters</li>
              <li className={numOneOk ? "ok" : "not-ok"}>At least one number</li>
              <li className={lowerOk ? "ok" : "not-ok"}>At least one lowercase character</li>
              <li className={upperOk ? "ok" : "not-ok"}>At least one uppercase character</li>
              <li className={symbolOk ? "ok" : "not-ok"}>No other symbols except written above</li>
            </ul>
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
              required
            />
          </div>
          <div className="chunk">
            <label
              className="lbl"
              htmlFor="password"
              id="password-label"
            >
              Confirm password:
            </label>
            <ul className="requirements-list">
              <li className={matchOk ? "ok" : "not-ok"}>Passwords should match</li>
            </ul>
            <input
              type="password"
              onChange={handlePasswordCChange}
              value={passwordC}
              required
            />
          </div>
          <div className="chunk">
            {errorMessage && (
              <ul className="requirements-list">
                <li className="not-ok">{errorMessage}</li>
              </ul>
            )}
          </div>
          <div className="chunk">
            <button type="submit" className="btn btn-pr float-right">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}