
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="inner-page">
      <div className="container">
        <p className="eyebrow">JOIN OUR COMMUNITY</p>

        <h1 className="page-heading">Create Your Account</h1>

        <p className="section-sub">
          Join PUNE PROPERTY | BY ANIKET to explore properties,
          connect with property owners and manage your enquiries.
        </p>

        <div style={{ maxWidth: "600px", marginTop: "35px" }}>
          <h2>Why Create an Account?</h2>

          <ul style={{ lineHeight: "2" }}>
            <li>Explore residential and commercial properties</li>
            <li>Save your favourite property listings</li>
            <li>Submit your property requirements</li>
            <li>Manage your property enquiries</li>
          </ul>

          <p style={{ marginTop: "25px" }}>
            Account registration will be activated when
            our secure login system is connected.
          </p>

          <Link href="/login" className="back-link">
            Already have an account? Login →
          </Link>

          <div style={{ marginTop: "25px" }}>
            <Link href="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
