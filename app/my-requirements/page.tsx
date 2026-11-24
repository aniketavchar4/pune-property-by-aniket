
import Link from "next/link";

export default function MyRequirementsPage() {
  return (
    <main className="inner-page">
      <div className="container">
        <p className="eyebrow">YOUR PROPERTY SEARCH</p>

        <h1 className="page-heading">My Requirements</h1>

        <p className="section-sub">
          Keep track of the properties you are looking for.
        </p>

        <div style={{ margin: "25px 0" }}>
          <Link href="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="empty-state" style={{ marginTop: "30px" }}>
          <h2>No Requirements Yet</h2>
          <p>
            You haven't submitted any property requirements yet.
            Start by telling us what you are looking for.
          </p>

          <div style={{ marginTop: "20px" }}>
            <Link href="/requirements" className="back-link">
              Submit a Requirement →
            </Link>
          </div>
        </div>

        <p className="demo-note">
          Your submitted requirements will appear here after
          database integration.
        </p>
      </div>
    </main>
  );
}
