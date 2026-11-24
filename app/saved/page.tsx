
import Link from "next/link";

export default function SavedPropertiesPage() {
  return (
    <main className="inner-page">
      <div className="container">
        <p className="eyebrow">YOUR FAVOURITES</p>

        <h1 className="page-heading">Saved Properties</h1>

        <p className="section-sub">
          All your favourite properties in one place.
        </p>

        <div style={{ margin: "25px 0" }}>
          <Link href="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="empty-state" style={{ marginTop: "30px" }}>
          <h2>No Saved Properties Yet</h2>
          <p>
            You haven't saved any properties. Explore our
            listings and save the ones you like.
          </p>

          <div style={{ marginTop: "20px" }}>
            <Link href="/buy" className="back-link">
              Explore Properties →
            </Link>
          </div>
        </div>

        <p className="demo-note">
          Saved property functionality will be activated
          after user authentication and database integration.
        </p>
      </div>
    </main>
  );
}
