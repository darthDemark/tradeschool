import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import CourseCard from "@/components/CourseCard";
import ProgressBar from "@/components/ProgressBar";
import { courses, curriculumProgress } from "@/lib/mockData";

export default function CoursesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Curriculum"
        subtitle="7 semesters. 8 courses. The complete options trading education."
      />

      {/* Overall progress */}
      <div
        className="card"
        style={{ padding: "28px 32px", marginBottom: "40px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, margin: "0 0 4px" }}>
              Overall Progress
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>
              {curriculumProgress.lessonsCompleted} lessons completed · Semester {curriculumProgress.currentSemester} active
            </p>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "36px", fontWeight: 600, color: "var(--accent)" }}>
            {curriculumProgress.overallPercent}%
          </div>
        </div>
        <ProgressBar percent={curriculumProgress.overallPercent} showPercent={false} height={8} />
      </div>

      {/* Course grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>

      {/* Coming soon */}
      <div
        style={{
          marginTop: "48px",
          padding: "32px",
          background: "var(--surface)",
          border: "1px dashed var(--border)",
          borderRadius: "18px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: "8px" }}>
          Coming in Phase 2
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, margin: "0 0 8px", color: "var(--text-main)" }}>
          Interactive Exercises & Quizzes
        </h3>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>
          Each lesson will include embedded interactive simulations, knowledge checks, and scenario-based exercises.
        </p>
      </div>
    </AppShell>
  );
}
