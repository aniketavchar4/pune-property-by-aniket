
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="inner-page">
      <div className="container">
        <p className="eyebrow">YOUR PERSONAL SPACE</p>

        <h1 className="page-heading">My Dashboard</h1>

        <p className="section-sub">
          Manage your property activity from one place.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "35px"
        }}>
          <div className="card">
            <h2>Saved Properties</h2>
            <p>View properties you have saved.</p>
            <Link href="/saved">Explore Saved Properties →</Link>
          </div>

          <div className="card">
            <h2>My Requirements</h2>
            <p>Manage your property requirements.</p>
            <Link href="/my-requirements">View Requirements →</Link>
          </div>

          <div className="card">
            <h2>Post a Requirement</h2>
            <p>Tell us what property you are looking for.</p>
            <Link href="/requirements">Post Requirement →</Link>
          </div>
        </div>

        <p className="demo-note" style={{ marginTop: "30px" }}>
          Dashboard features will become active after user
          authentication and database integration.
        </p>

        <div style={{ marginTop: "25px" }}>
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
