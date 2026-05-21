function Logo({ stacked = false }) {
  return (
    <span className={stacked ? "logo logo-stacked" : "logo"}>
      <svg
        aria-hidden="true"
        className="logo-mark"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 14c8 0 15 2 22 7 7-5 14-7 22-7v36c-8 0-15 2-22 7-7-5-14-7-22-7V14Z"
          fill="currentColor"
          opacity="0.18"
        />
        <path
          d="M32 21v36M10 14c8 0 15 2 22 7 7-5 14-7 22-7v36c-8 0-15 2-22 7-7-5-14-7-22-7V14Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M39 30l-5 12-9-7 12-5 2 0Z"
          fill="#f2bd59"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      <span className="logo-copy">
        <strong>Travel Seekers</strong>
        {stacked && <small>Explore. Plan. Remember.</small>}
      </span>
    </span>
  );
}

export default Logo;
