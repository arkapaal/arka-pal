// Backend/leetcode.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

// Separate queries work more reliably than combined ones
const STATS_QUERY = `
  query getUserStats($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

const CALENDAR_QUERY = `
  query getUserCalendar($username: String!) {
    matchedUser(username: $username) {
      userCalendar(year: 0) {
        streak
        totalActiveDays
        submissionCalendar
      }
    }
  }
`;
const username = process.env.LEETCODE_USERNAME || "arka22";

// Helper to call LeetCode GraphQL
async function queryLeetCode(query, variables) {
  const res = await fetch(LEETCODE_GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Referer": "https://leetcode.com",
      "Origin": "https://leetcode.com",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`LeetCode responded with ${res.status}`);
  }

  return res.json();
}

router.get("/", async (req, res) => {
  const username = process.env.LEETCODE_USERNAME || req.query.username;

  if (!username) {
    return res.status(400).json({ error: "No LeetCode username provided" });
  }

  try {
    // Run both queries in parallel
    const [statsData, calendarData] = await Promise.all([
      queryLeetCode(STATS_QUERY, { username }),
      queryLeetCode(CALENDAR_QUERY, { username }),
    ]);

    console.log("Stats response:", JSON.stringify(statsData));
    console.log("Calendar response:", JSON.stringify(calendarData));

    const user = statsData?.data?.matchedUser;
    const calUser = calendarData?.data?.matchedUser;

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        raw: statsData,
      });
    }

    // Parse submission calendar
    const calendarRaw = calUser?.userCalendar?.submissionCalendar || "{}";
    const calendar = JSON.parse(calendarRaw);

    // Last 365 days only
    const today = Math.floor(Date.now() / 1000);
    const oneYearAgo = today - 365 * 24 * 60 * 60;

    const submissions = Object.entries(calendar)
      .filter(([timestamp]) => Number(timestamp) >= oneYearAgo)
      .map(([timestamp, count]) => ({
        date: new Date(Number(timestamp) * 1000).toISOString().split("T")[0],
        count: Number(count),
      }));

    const acStats = user.submitStats?.acSubmissionNum || [];

    return res.json({
      username: user.username,
      streak: calUser?.userCalendar?.streak || 0,
      totalActiveDays: calUser?.userCalendar?.totalActiveDays || 0,
      submissions,
      stats: {
        easy: acStats.find((s) => s.difficulty === "Easy")?.count || 0,
        medium: acStats.find((s) => s.difficulty === "Medium")?.count || 0,
        hard: acStats.find((s) => s.difficulty === "Hard")?.count || 0,
        total: acStats.find((s) => s.difficulty === "All")?.count || 0,
      },
    });
  } catch (error) {
    console.error("LeetCode error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;