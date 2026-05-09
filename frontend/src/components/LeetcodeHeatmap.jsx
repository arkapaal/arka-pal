// frontend/src/components/LeetcodeHeatmap.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getLast365Days() {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

function getColor(count) {
  if (count === 0) return "#0a0a0a";
  if (count <= 2) return "#1a3a0a";
  if (count <= 5) return "#2d6b10";
  if (count <= 9) return "#4a9e1a";
  return "#a3e635";
}

function getBorder(count) {
  if (count === 0) return "border-white/5";
  if (count <= 2) return "border-[#a3e635]/10";
  if (count <= 5) return "border-[#a3e635]/20";
  if (count <= 9) return "border-[#a3e635]/40";
  return "border-[#a3e635]/70";
}

// Group days into weeks (columns)
function buildWeeks(days, submissionMap) {
  const weeks = [];
  let week = [];

  // Pad start so first day aligns to correct weekday
  const firstDay = new Date(days[0]).getDay();
  for (let i = 0; i < firstDay; i++) {
    week.push(null);
  }

  days.forEach((date) => {
    week.push({ date, count: submissionMap[date] || 0 });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

// Get month labels with column positions
function getMonthLabels(weeks) {
  const labels = [];
  let lastMonth = null;
  weeks.forEach((week, i) => {
    const firstReal = week.find((d) => d !== null);
    if (firstReal) {
      const month = new Date(firstReal.date).getMonth();
      if (month !== lastMonth) {
        labels.push({ month, col: i });
        lastMonth = month;
      }
    }
  });
  return labels;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, color = "text-[#a3e635]" }) => (
  <div className="p-4 bg-[#0a0a0a] border border-white/10 rounded-xl text-center">
    <p className={`text-2xl font-black ${color}`}>{value}</p>
    <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">{label}</p>
  </div>
);

// ─── Tooltip ──────────────────────────────────────────────────────────────────

const Tooltip = ({ date, count, visible }) => {
  if (!visible) return null;
  const formatted = new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return (
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap px-2 py-1 bg-[#1a1a1a] border border-white/10 rounded text-xs text-white pointer-events-none shadow-xl">
      {count} submission{count !== 1 ? "s" : ""} · {formatted}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LeetcodeHeatmap() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState({ date: "", count: 0, visible: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/leetcode");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Could not load LeetCode data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const days = getLast365Days();
  const submissionMap = {};
  if (data?.submissions) {
    data.submissions.forEach(({ date, count }) => {
      submissionMap[date] = count;
    });
  }

  const weeks = buildWeeks(days, submissionMap);
  const monthLabels = getMonthLabels(weeks);

  return (
    <section id="leetcode" className="bg-black py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[#a3e635] mb-3 font-semibold">Consistency</p>
          <h2 className="text-5xl font-black text-white mb-2">
            LeetCode <span className="text-[#a3e635]">Activity</span>
          </h2>
          <div className="w-16 h-1 bg-[#a3e635] mt-4" />
        </motion.div>

        {loading && (
          <div className="flex items-center gap-3 text-gray-500">
            <div className="w-4 h-4 border-2 border-[#a3e635]/40 border-t-[#a3e635] rounded-full animate-spin" />
            <span className="text-sm">Loading activity...</span>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {data && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Stats Row
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
              <StatCard label="Total Solved" value={data.stats.total} />
              <StatCard label="Easy" value={data.stats.easy} color="text-green-400" />
              <StatCard label="Medium" value={data.stats.medium} color="text-yellow-400" />
              <StatCard label="Hard" value={data.stats.hard} color="text-red-400" />
              <StatCard label="Day Streak" value={`${data.streak}🔥`} />
            </div> */}

            {/* Heatmap */}
            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-x-auto">

              {/* Month labels */}
              <div className="flex mb-1 ml-8">
                {weeks.map((_, i) => {
                  const label = monthLabels.find((l) => l.col === i);
                  return (
                    <div key={i} className="w-[14px] mr-[2px] text-[9px] text-gray-600 flex-shrink-0">
                      {label ? MONTHS[label.month] : ""}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-0">
                {/* Day labels */}
                <div className="flex flex-col mr-2 mt-[2px]">
                  {DAYS.map((day, i) => (
                    <div key={i} className="h-[14px] mb-[2px] text-[9px] text-gray-600 flex items-center">
                      {i % 2 === 1 ? day.slice(0, 1) : ""}
                    </div>
                  ))}
                </div>

                {/* Grid */}
                <div className="flex gap-[2px]">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[2px]">
                      {week.map((cell, di) => {
                        if (!cell) {
                          return <div key={di} className="w-[14px] h-[14px]" />;
                        }
                        return (
                          <div
                            key={di}
                            className={`w-[14px] h-[14px] rounded-[2px] border relative cursor-pointer transition-transform hover:scale-125 ${getBorder(cell.count)}`}
                            style={{ backgroundColor: getColor(cell.count) }}
                            onMouseEnter={() => setTooltip({ date: cell.date, count: cell.count, visible: true })}
                            onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
                          >
                            {tooltip.visible && tooltip.date === cell.date && (
                              <Tooltip date={cell.date} count={cell.count} visible />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-2 mt-4 justify-end">
                <span className="text-[10px] text-gray-600">Less</span>
                {[0, 2, 5, 9, 10].map((v) => (
                  <div
                    key={v}
                    className="w-[14px] h-[14px] rounded-[2px] border border-white/5"
                    style={{ backgroundColor: getColor(v) }}
                  />
                ))}
                <span className="text-[10px] text-gray-600">More</span>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <p className="text-xs text-gray-600">
                  <span className="text-[#a3e635] font-semibold">{data.totalActiveDays}</span> active days in the past year
                </p>
                <a
                  href={`https://leetcode.com/${data.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-[#a3e635] transition-colors flex items-center gap-1"
                >
                  @{data.username}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}