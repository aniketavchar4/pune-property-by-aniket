
import Link from "next/link";
import { properties } from "@/lib/properties";
import PropertyCard from "@/components/property-card";

export default function RentPage() {
  const listings = properties.filter(
    (property) => property.purpose === "Rent"
  );

  return (
    <main className="inner-page">
      <div className="container">
        <p className="eyebrow">FIND YOUR NEXT HOME</p>
        <h1 className="page-heading">Properties for Rent</h1>
        <p className="section-sub">
          Discover rooms, flats and apartments available
          for rent across Pune.
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
