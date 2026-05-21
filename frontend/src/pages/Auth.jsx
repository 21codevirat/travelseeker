import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function Auth({ mode = "login", currentUser, onLogin, onSignup }) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";
  const [status, setStatus] = useState("");

  function submitAuth(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const credentials = {
      email: formData.get("email").trim().toLowerCase(),
      name: formData.get("name")?.trim(),
      password: formData.get("password"),
      phone: formData.get("phone")?.trim(),
    };

    const result = isSignup ? onSignup(credentials) : onLogin(credentials);

    if (!result.ok) {
      setStatus(result.message);
      return;
    }

    setStatus(result.message);
    navigate("/booking");
  }

  return (
    <section className="page-section auth-page">
      <PageHeader
        eyebrow={isSignup ? "Create account" : "Welcome back"}
        title={isSignup ? "Sign up" : "Login"}
        copy="Access bookings faster, keep your travel requests together, and prefill trip enquiries."
      />

      <div className="auth-layout">
        <form className="auth-card" onSubmit={submitAuth}>
          {isSignup && (
            <>
              <label>
                <span>Name</span>
                <input required name="name" type="text" placeholder="Your name" />
              </label>
              <label>
                <span>Phone</span>
                <input required name="phone" type="tel" placeholder="+91 98765 43210" />
              </label>
            </>
          )}

          <label>
            <span>Email</span>
            <input required name="email" type="email" placeholder="you@example.com" />
          </label>
          <label>
            <span>Password</span>
            <input required minLength="6" name="password" type="password" />
          </label>

          <button className="primary-button" type="submit">
            {isSignup ? "Create Account" : "Login"}
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>

        <aside className="auth-aside">
          {currentUser ? (
            <>
              <p className="eyebrow">Signed in</p>
              <h2>{currentUser.name}</h2>
              <p>Your next booking request will use this account.</p>
              <Link className="primary-button" to="/booking">
                Open Booking
              </Link>
            </>
          ) : (
            <>
              <p className="eyebrow">{isSignup ? "Already joined?" : "New here?"}</p>
              <h2>{isSignup ? "Login to continue." : "Create a travel account."}</h2>
              <p>
                This local demo keeps account details in your browser so the app
                can show the complete customer flow.
              </p>
              <Link className="text-button" to={isSignup ? "/login" : "/signup"}>
                {isSignup ? "Go to login" : "Create account"}
              </Link>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

export default Auth;
