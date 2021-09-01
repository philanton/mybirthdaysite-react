import { ChangeEvent, SyntheticEvent, useState } from "react"
import { useRouter } from "next/router"

export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handlePasswordCChange = (e: ChangeEvent<HTMLInputElement>) => setPasswordC(e.target.value);

  const handleSubmit: (e: SyntheticEvent) => void = (e) => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    router.replace('/');
  }

  return (
    <div className="desert desert-up">
      <div className="content">
        <h2>Sign Up</h2>
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
              <li className="text-red-700">Minimum length - 8 characters</li>
              <li className="text-red-700">At least one number</li>
              <li className="text-red-700">At least one lowercase character</li>
              <li className="text-red-700">At least one uppercase character</li>
              <li className="text-red-700">No other symbols except written above</li>
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
              <li className="text-red-700">Passwords should match</li>
            </ul>
            <input
              type="password"
              onChange={handlePasswordCChange}
              value={passwordC}
              required
            />
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