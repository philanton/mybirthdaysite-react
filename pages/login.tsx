import { ChangeEvent, SyntheticEvent, useState } from "react"
import { useRouter } from "next/router"

export default function LogInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit: (e: SyntheticEvent) => void = (e) => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    router.replace('/');
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