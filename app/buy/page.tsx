
import Link from "next/link";
import { properties } from "@/lib/properties";
import PropertyCard from "@/components/property-card";

export default function BuyPage() {
  const listings = properties.filter(
    (property) => property.purpose === "Buy"
  );

  return (
    <main className="inner-page">
      <div className="container">
        <p className="eyebrow">FIND YOUR DREAM PROPERTY</p>
        <h1 className="page-heading">Properties for Sale</h1>
        <p className="section-sub">
          Explore residential properties, apartments and plots
          available for sale across Pune.
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

        <p className="demo-note">
          Demo listings for website preview. Real property
          inventory will be connected through Supabase.
        </p>
      </div>
    </main>
  );
}
