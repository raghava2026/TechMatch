import React from "react";
import { Link } from "react-router-dom";
// Make sure this path matches where you saved the CSS file
import "../styles/Pages.css";

const ORG = {
  name: "TECH MATCH Solutions",
  email: "techmatch2k25@gmail.com",
  phoneYuvaraj: "+916303319981",
  phoneArif: "+918309583137",
  address:
    "#227, #228, 4th Floor, Skanda Mall, Beside D-MART, Ballari Chowrasta, Kurnool - 518003",
  origin:
    typeof window !== "undefined" ? window.location.origin : "https://techmatch.in",
};

export default function About() {
  // JSON-LD Structure for SEO (Unchanged)
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG.name,
    url: ORG.origin,
    logo: `${ORG.origin}/assets/logo.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: ORG.phoneYuvaraj,
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["English"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.address,
      addressCountry: "IN",
    },
  };

  // Team Data (Unchanged)
  const team = [
    {
      id: "yuvaraj",
      name: "R Yuvaraj",
      title: "Founder & Lead Admissions Counsellor",
      bio: "Expert in Andhra Pradesh admissions and student mentoring. Focused on outcomes and verified college matches.",
      img: "/assets/yuvaraj.jpg",
      phone: ORG.phoneYuvaraj,
    },
    {
      id: "arif",
      name: "Arif Nawaz",
      title: "Partnerships & External Relations",
      bio: "Manages partner relationships, institutional liasoning and program collaborations.",
      img: "/assets/arif.jpg",
      phone: ORG.phoneArif,
    },
    {
      id: "vicky",
      name: "Vicky",
      title: "Operations & Program Manager",
      bio: "Leads program logistics, school campaigns and delivery across Andhra Pradesh and Karnataka.",
      img: "/assets/vicky.jpg",
      phone: ORG.phoneYuvaraj,
    },
    {
      id: "vishal",
      name: "",
      title: "Operations & Program Manager",
      bio: "Leads program logistics, school campaigns and delivery across Andhra Pradesh and Karnataka.",
      img: "/assets/vishal.jpg",
      phone: ORG.phoneYuvaraj,
    },
  ];

  // Helper for missing images
  const handleImageError = (e) => {
    // Replace with a generic placeholder if available, or hide.
    // Assuming you have a placeholder. If not, use e.target.style.display='none'
    e.target.src = '/assets/avatar-placeholder.png';
  };

  return (
    <main className="tm-about-page">
      {/* JSON-LD Injector */}
      <script type="application/ld+json">{JSON.stringify(jsonLdOrg)}</script>

      {/* ==========================
          HERO SECTION
      =========================== */}
      <header className="tm-hero" role="banner" aria-labelledby="about-hero-title">
        <div className="tm-container tm-hero-grid">
          <div className="tm-hero-copy">
            <h1 id="about-hero-title">
              About
              <br></br>
              <span>TECH MATCH</span> Solutions
            </h1>
            <p className="tm-lead">
              We guide students from shortlisting to admission — domestic and
              international — with honest counselling, verified college
              information, and partner-backed programs.
            </p>

            <ul className="tm-quick-list" aria-hidden="false">
              <li>
                <b>Admissions</b> — Domestic & International
              </li>
              <li>
                <b>Counselling</b> — 1-on-1 planning, SOP & interview prep
              </li>
              <li>
                <b>Projects</b> — Digital marketing, infra, branding &
                campaign support
              </li>
            </ul>

            <div className="tm-hero-ctas">
              <Link to="/services" className="tm-btn tm-btn-primary large">
                Our Services
              </Link>
              <Link to='/contact' className="tm-btn tm-btn-outline large">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Image container structured for organic CSS shape */}
          <div className="tm-hero-media" aria-hidden="true">
            <img
              src="/assets/about-hero.jpg"
              alt="Students and counsellors collaborating in an office"
              onError={(e) => e.target.style.display = 'none'} /* Hide if hero is missing, or use a placeholder */
            />
          </div>
        </div>
      </header>

      {/* ==========================
          MISSION / VALUES SECTION
      =========================== */}
      <section className="tm-section tm-values tm-container" aria-labelledby="values-title">
        <h2 id="values-title">Our mission</h2>
        <p className="tm-values-desc">
          To make admissions transparent and effective — connecting students with
          programs that fit their goals, and helping partners scale through
          targeted project work.
        </p>

        <div className="tm-values-grid">
          <article className="tm-card card-gray">
            <div className="tm-card-icon" role="img" aria-label="Target icon">🎯</div>
            <h3>Student-first outcomes</h3>
            <p>
              Personalized roadmaps and measurable progress — not generic
              recommendations.
            </p>
          </article>

          <article className="tm-card card-gray">
            <div className="tm-card-icon" role="img" aria-label="Handshake icon">🤝</div>
            <h3>Trusted partners</h3>
            <p>
              Verified college links, partner programs, and industry-aligned
              offerings.
            </p>
          </article>

          <article className="tm-card card-gray">
            <div className="tm-card-icon" role="img" aria-label="Gears icon">⚙️</div>
            <h3>Project delivery</h3>
            <p>
              We deliver digital marketing, web/infrastructure and campaign
              projects for institutions and businesses.
            </p>
          </article>
        </div>
      </section>

      {/* ==========================
          TEAM SECTION (New Structure)
      =========================== */}
      <section className="tm-section tm-team tm-container" aria-labelledby="team-title">
        <h2 id="team-title">Meet the team</h2>
        <p className="tm-muted">
          A small, experienced team focused on admissions, partnerships and
          program delivery.
        </p>

        <div className="tm-team-grid">
          {team.map((m) => (
            // The card structure is updated to support CSS hover effects
            <div
              key={m.id}
              className="tm-team-card"
              tabIndex={0}
              aria-labelledby={`${m.id}-name`}
            >
              {/* 1. Media Area */}
              <div className="tm-team-media">
                <img
                  src={m.img}
                  alt={m.name}
                  onError={handleImageError}
                />
              </div>

              {/* 2. Body Content Area */}
              <div className="tm-team-body">
                <h3 id={`${m.id}-name`}>{m.name}</h3>
                {/* Added tm-role class for styling */}
                <p className="tm-role">{m.title}</p>
                <p className="tm-bio">{m.bio}</p>
              </div>

              {/* 3. Actions Area (Hidden by default in CSS, shown on hover) */}
              <div className="tm-team-actions" aria-hidden="true">
                <a
                  className="tm-action-btn primary"
                  href={`tel:${m.phone}`}
                  aria-label={`Call ${m.name}`}
                >
                  Call
                </a>
                <a
                  className="tm-action-btn outline"
                  href={`mailto:${ORG.email}`}
                  aria-label={`Email ${m.name}`}
                >
                  Email
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================
          PROJECT DOMAINS SECTION
      =========================== */}
      <section className="tm-section tm-projects tm-container" aria-labelledby="projects-title">
        <h2 id="projects-title">Projects & Domains</h2>
        <p className="tm-muted">
          We take on custom projects for partners — from marketing to
          infrastructure.
        </p>

        <div className="tm-project-grid">
          {/* Using card classes to create interactive tags */}
          <div className="tm-card card-gray">Digital Marketing</div>
          <div className="tm-card card-gray">Infrastructure & Architecture</div>
          <div className="tm-card card-gray">Web Design & DB Management</div>
          <div className="tm-card card-gray">Brand & Campaign Support</div>
          <div className="tm-card card-gray">School Campaigns</div>
          <div className="tm-card card-gray">Foreign Trips & Startup Support</div>
          <div className="tm-card card-gray">Poster & Collateral Design</div>
        </div>
      </section>

      {/* ==========================
          CTA + CONTACT SECTION
      =========================== */}
      <section className="tm-section tm-cta tm-container" aria-labelledby="cta-title">
        <div className="tm-cta-box">
          {/* Main Text Area */}
          <div>
            <h2 id="cta-title">Ready to take the next step?</h2>
            <p className="tm-muted">
              Book a free consultation and we'll help map a practical,
              step-by-step plan.
            </p>
            <div className="tm-cta-actions" style={{ marginTop: '2rem' }}>
              <Link className="tm-btn tm-btn-primary large" to="https://techmatch-schudling.lovable.app">
                Book Consultation
              </Link>
              {/* The CSS automatically handles changing this outline button to white on the dark background */}
              <a className="tm-btn tm-btn-outline large" href={`mailto:${ORG.email}`}>
                Contact Us
              </a>
            </div>
          </div>

          {/* Mini Contact Sidebar (re-styled by CSS for desktop/mobile) */}
          <div className="tm-contact-mini">
            <div>
              <strong>Address:</strong> {ORG.address}
            </div>
            <div>
              <strong>Phones:</strong> <a href={`tel:${ORG.phoneYuvaraj}`}>{ORG.phoneYuvaraj}</a> • <a href={`tel:${ORG.phoneArif}`}>{ORG.phoneArif}</a>
            </div>
            <div>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}