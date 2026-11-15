/**
 * PageHeader — shared page header used by /languages, /cs-core, /about.
 *
 * Layout: 64px top padding, 40px bottom padding, 1px --border bottom line.
 * Container width is NOT applied here — the parent page provides the container.
 *
 * Props:
 *   path        — mono 12px --muted breadcrumb, e.g. "~/languages"
 *   title       — H1, clamp(32px,4vw,44px), weight 500
 *   description — 16px --muted, max 60ch
 *   meta        — optional mono 12px --muted line below description
 */
export function PageHeader({ path, title, description, meta }) {
  return (
    <div
      style={{
        paddingTop:    "64px",
        paddingBottom: "40px",
        borderBottom:  "1px solid var(--border)",
      }}
    >
      {/* Breadcrumb path */}
      <p
        className="font-mono"
        style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "14px" }}
      >
        {path}
      </p>

      {/* H1 */}
      <h1
        className="font-sans font-medium"
        style={{
          fontSize:      "clamp(32px, 4vw, 44px)",
          letterSpacing: "-0.02em",
          color:         "var(--text)",
          lineHeight:    1.1,
          marginBottom:  "12px",
        }}
      >
        {title}
      </h1>

      {/* Description */}
      <p
        className="font-sans"
        style={{
          fontSize:   "16px",
          color:      "var(--muted)",
          maxWidth:   "60ch",
          lineHeight: 1.6,
          margin:     0,
        }}
      >
        {description}
      </p>

      {/* Optional meta line */}
      {meta && (
        <p
          className="font-mono"
          style={{
            fontSize:   "12px",
            color:      "var(--muted)",
            marginTop:  "8px",
          }}
        >
          {meta}
        </p>
      )}
    </div>
  );
}
