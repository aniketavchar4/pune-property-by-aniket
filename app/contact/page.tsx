
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="inner-page">
      <div className="container">
        <p className="eyebrow">GET IN TOUCH</p>

        <h1 className="page-heading">Contact Us</h1>

        <p className="section-sub">
          Looking to buy, rent, sell or list a property
          in Pune? We would love to hear from you.
        </p>

        <div style={{ margin: "25px 0" }}>
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
        </div>

        <section style={{ marginTop: "40px", maxWidth: "700px" }}>
          <h2>PUNE PROPERTY | BY ANIKET</h2>

          <p>
            Your property discovery partner in Pune.
            Connect with us for property enquiries,
            listing assistance and more.
          </p>

          <h3 style={{ marginTop: "25px" }}>
            Send Us an Enquiry
          </h3>

          <p>
            For property enquiries and listing assistance,
            contact us directly.
          </p>

          <a
            href="https://wa.me/91"
            target="_blank"
            rel="noopener noreferrer"
            className="back-link"
          >
            Contact on WhatsApp
          </a>
        </section>
      </div>
    </main>
  );
}
