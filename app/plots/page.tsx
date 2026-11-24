
import Link from "next/link";
import { properties } from "@/lib/properties";
import PropertyCard from "@/components/property-card";

export default function PlotsPage() {
  const listings = properties.filter(
    (property) => property.type === "Plot"
  );

  return (
    <main className="inner-page">
      <div className="container">
        <p className="eyebrow">LAND & INVESTMENT OPPORTUNITIES</p>
        <h1 className="page-heading">Plots & Land</h1>
        <p className="section-sub">
          Discover residential plots and land investment
          opportunities across Pune.
        </p>

        <div style={{ margin: "25px 0" }}>
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
        </div>

        <div className="property-grid">
          {listings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {listings.length === 0 && (
          <div className="empty-state">
            No plots or land listings available yet.
          </div>
        )}

        <p className="demo-note">
          Demo listings for preview. Real inventory
          will be connected through Supabase.
        </p>
      </div>
    </main>
  );
}
