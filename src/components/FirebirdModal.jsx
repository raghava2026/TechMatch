import React, { useEffect, useRef } from "react";

/**
 * FirebirdModal
 *
 * Props:
 *  - open (bool)            : whether modal is visible
 *  - onClose (func)         : close handler (required)
 *  - partnerUrl (string)    : external partner link
 *  - partnerName (string)   : partner display name
 *  - programs (string)      : short programs line
 *  - imageSrc (string)      : hero image url
 *
 * Behavior:
 *  - Closes only when user clicks Close button or presses Escape.
 *  - Does NOT close when overlay is clicked (per spec).
 *  - Focus is trapped inside the modal while open; focus returns to last active element after close.
 *  - Body scroll locked while open.
 */

const DEFAULT_IMAGE =
  "https://www.firebird.ac.in/wp-content/uploads/2023/06/landscape-student-pic-1.jpg";

export default function FirebirdModal({
  open,
  onClose,
  partnerUrl = "https://firebird.ac.in",
  partnerName = "FIREBIRD — Institute of Research in Management",
  programs = "PGDM · Global MBA · PGP — The Business School that speaks industry languages",
  imageSrc = DEFAULT_IMAGE,
}) {
  const modalRef = useRef(null);
  const lastActiveRef = useRef(null);

  // Inject minimal CSS for animations (safe to run once)
  useEffect(() => {
    if (document.getElementById("fm-modal-styles")) return;
    const style = document.createElement("style");
    style.id = "fm-modal-styles";
    style.innerHTML = `
      @keyframes fmFadeIn { from { opacity: 0 } to { opacity: 1 } }
      @keyframes fmSlideUp { from { transform: translateY(12px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      .fm-overlay { animation: fmFadeIn 220ms ease; }
      .fm-card { animation: fmSlideUp 260ms cubic-bezier(.2,.9,.3,1); }
      .fm-cta { transition: transform .12s ease, box-shadow .12s ease; }
      .fm-cta:focus, .fm-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.12); }
    `;
    document.head.appendChild(style);
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement;

    // Move focus into modal (first focusable)
    const timer = setTimeout(() => {
      if (!modalRef.current) return;
      const focusables = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length) {
        focusables[0].focus();
      } else {
        modalRef.current.focus();
      }
    }, 10);

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      // implement focus trap
      if (e.key === "Tab") {
        if (!modalRef.current) return;
        const nodes = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      // return focus to previously focused element
      try {
        if (lastActiveRef.current && lastActiveRef.current.focus) lastActiveRef.current.focus();
      } catch (err) {
        // ignore
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  // Inline styles (clean, modern look). You can move them to CSS files.
  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.48))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
    padding: "24px",
    boxSizing: "border-box",
  };

  const cardStyle = {
    width: "100%",
    height: "95%",
    maxWidth: 960,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 12px 40px rgba(16,24,40,0.12)",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 0,
    outline: "none",
    // responsive: two-column on large screens
    // we'll use a simple media query below to switch columns; but keep JS-friendly fallback
  };

  const contentStyle = {
    padding: "22px",
  };

  const imageWrapStyle = {
    width: "100%",
    height: "100%",
    minHeight: 220,
    overflow: "hidden",
    display: "block",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const headingStyle = {
    margin: 0,
    fontSize: 20,
    lineHeight: 1.2,
    color: "#0f172a",
    fontWeight: 700,
  };

  const subStyle = {
    margin: "8px 0 14px",
    color: "#334155",
    fontSize: 14,
  };

  const paragraphStyle = {
    margin: "10px 0 16px",
    color: "#475569",
    fontSize: 14,
  };

  const actionsStyle = {
    display: "flex",
    gap: 12,
    marginTop: 8,
    alignItems: "center",
  };

  const primaryBtnStyle = {
    background:
      "linear-gradient(90deg, rgba(42,75,155,1) 0%, rgba(70,111,255,1) 100%)",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: 8,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 6px 18px rgba(70,111,255,0.12)",
  };

  const ghostBtnStyle = {
    background: "transparent",
    color: "#0f172a",
    border: "1px solid rgba(15,23,42,0.06)",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  };

  const closeBtnStyle = {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.9)",
    boxShadow: "0 4px 12px rgba(2,6,23,0.08)",
    cursor: "pointer",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Media query hack: switch layout to two column on wide screens
  // We'll render an inner wrapper that uses CSS grid via style tag inserted in DOM.
  const twoColumnClass = "fm-two-column-grid";

  return (
    <div
      className="fm-overlay"
      style={overlayStyle}
      role="dialog"
      aria-modal="true"
      aria-labelledby="fm-title"
      aria-describedby="fm-desc"
    >
      <div
        className={`${twoColumnClass}`}
        ref={modalRef}
        style={cardStyle}
        tabIndex={-1}
      >
        {/* Close button (only way to close apart from Escape) */}
        <button
          aria-label="Close dialog"
          onClick={onClose}
          style={closeBtnStyle}
        >
          ✕
        </button>

        {/* Content: image + details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", minHeight: 220 }}>
          <div style={imageWrapStyle}>
            <img src={imageSrc} alt={`${partnerName} hero`} style={imageStyle} />
          </div>

          <div style={contentStyle}>
            <h2 id="fm-title" style={headingStyle}>
              {partnerName}
            </h2>
            <div style={subStyle}>
              <strong style={{ color: "#0f172a" }}>{programs}</strong>
            </div>

            <p id="fm-desc" style={paragraphStyle}>
              Explore our exclusive industry-linked programs and research collaborations. Learn how TECH MATCH and {partnerName.split(" — ")[0]}
              work together to prepare students for industry-ready careers.
            </p>

            <div style={actionsStyle}>
              <a
                href={partnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={primaryBtnStyle}
                className="fm-cta"
              >
                Learn More
              </a>

              <button
                onClick={onClose}
                style={ghostBtnStyle}
                className="fm-cta"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Responsive style injected only for two-column layout on wide screens */}
        <style>{`
          .${twoColumnClass} {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
            position: relative;
          }
          @media (min-width: 900px) {
            .${twoColumnClass} {
              grid-template-columns: 420px 1fr;
            }
            .${twoColumnClass} > div:nth-child(1) { /* image cell */
              min-height: 320px;
            }
            .${twoColumnClass} > div:nth-child(2) { /* content cell */
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          }
          /* small optimizations */
          @media (max-width: 420px) {
            .${twoColumnClass} img {
              min-height: 160px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
