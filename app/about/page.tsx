
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="inner-page">
      <div className="container">
        <p className="eyebrow">ABOUT OUR PLATFORM</p>

        <h1 className="page-heading">
          Making Property Search Simple.
        </h1>

        <p className="section-sub">
          PUNE PROPERTY | BY ANIKET is a property platform
          focused on helping people discover homes,
          commercial spaces and land opportunities across Pune.
        </p>

        <div style={{ margin: "25px 0" }}>
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
        </div>

        <section style={{ marginTop: "40px", maxWidth: "750px" }}>
          <h2>Our Mission</h2>
          <p>
            Our mission is to make buying, renting and
            exploring properties easier through a simple,
            transparent and user-friendly platform.
          </p>

          <h2 style={{ marginTop: "30px" }}>What We Offer</h2>
          <ul>
            <li>Residential properties for sale</li>
            <li>Homes and rooms for rent</li>
            <li>Commercial spaces and shops</li>
            <li>Residential plots and land</li>
            <li>Property requirements and enquiries</li>
          </ul>

          <h2 style={{ marginTop: "30px" }}>Our Vision</h2>
          <p>
            To build a trusted property discovery platform
            connecting property owners, buyers and tenants
            across Pune and nearby locations.
          </p>
        </section>
      </div>
    </main>
  );
}
