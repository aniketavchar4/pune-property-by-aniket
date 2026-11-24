
import Link from "next/link";
import { properties } from "@/lib/properties";
import PropertyCard from "@/components/property-card";

export default function CommercialPage() {
  const listings = properties.filter(
    (property) => property.type === "Commercial"
  );

  return (
    <main className="inner-page">
      <div className="container">
        <p className="eyebrow">BUSINESS SPACES IN PUNE</p>
        <h1 className="page-heading">
          Commercial Properties
        </h1>
        <p className="section-sub">
          Explore shops, offices and commercial spaces
          available for sale and rent across Pune.
        </p>

        <div style={{ margin: "25px 0" }}>
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
        </div>

        <div className="property-grid">
          {listings.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>

        {listings.length === 0 && (
          <div className="empty-state">
            No commercial properties available yet.
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
