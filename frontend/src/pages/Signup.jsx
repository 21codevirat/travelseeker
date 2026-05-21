function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Create Account</h1>

        <input type="text" placeholder="Full Name" />

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button>Create Account</button>

      </div>
    </div>
  );
}

export default Signup;