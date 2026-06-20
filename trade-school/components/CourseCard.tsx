import Link from "next/link";
import ProgressBar from "./ProgressBar";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: "active" | "locked" | "completed";
  estimatedLessons: number;
  completedLessons: number;
  tags?: string[];
  semester?: number;
}

export default function CourseCard({
  id,
  title,
  description,
  progress,
  status,
  estimatedLessons,
  completedLessons,
  tags,
  semester,
}: CourseCardProps) {
  const isLocked = status === "locked";

  const statusBadge = {
    active: { label: "Active", className: "badge badge-gold" },
    locked: { label: "Locked", className: "badge badge-muted" },
    completed: { label: "Complete", className: "badge badge-success" },
  }[status];

  return (
    <div
      className="card"
      style={{
        padding: "28px",
        opacity: isLocked ? 0.6 : 1,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        cursor: isLocked ? "default" : "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          {semester && (
            <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: "6px" }}>
              Semester {semester}
            </div>
          )}
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, color: "var(--text-main)", margin: 0, lineHeight: 1.3 }}>
            {title}
          </h3>
        </div>
        <span className={statusBadge.className}>{statusBadge.label}</span>
      </div>

      <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>{description}</p>

      {tags && tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                background: "var(--surface-alt)",
                borderRadius: "999px",
                color: "var(--text-soft)",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div>
        <ProgressBar percent={progress} showPercent />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-soft)" }}>
            {completedLessons} / {estimatedLessons} lessons
          </span>
          {!isLocked && (
            <Link
              href={`/courses/${id}`}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              {progress > 0 ? "Continue →" : "Begin →"}
            </Link>
          )}
          {isLocked && (
            <span style={{ fontSize: "12px", color: "var(--text-soft)" }}>
              🔒 Complete previous semester
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
