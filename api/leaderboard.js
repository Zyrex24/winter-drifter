import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method === 'GET') {
    try {
      // Fetch top 10 scores
      // Using a sorted set: 'leaderboard'
      // ZREVRANGE leaderboard 0 9 WITHSCORES
      const scores = await kv.zrange('leaderboard', 0, 9, { rev: true, withScores: true });
      
      // format: [name1, score1, name2, score2...] -> [{name, score}, ...]
      const formatted = [];
      for (let i = 0; i < scores.length; i += 2) {
          formatted.push({ name: scores[i], score: scores[i+1] });
      }

      return response.status(200).json(formatted);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  } else if (request.method === 'POST') {
    try {
      const { name, score } = request.body;
      
      if (!name || typeof score !== 'number') {
        return response.status(400).json({ error: 'Invalid input' });
      }

      // Store in sorted set
      // We append a timestamp to the name or handle duplicates? 
      // Redis ZADD updates the score if member exists.
      // To allow duplicate names with different scores, we might need a unique ID.
      // For this simple game, we'll construct a unique member string: "Name#Timestamp"
      // But displaying it cleanly requires stripping the suffix.
      // Let's stick to unique names for simplicity or suffix invisible char.
      // Or better: store a JSON string as member? No, ZADD expects string member and number score.
      // Let's use "Name:Timestamp" as member.

      const timestamp = Date.now();
      const member = `${name}:${timestamp}`;
      
      await kv.zadd('leaderboard', { score: score, member: member });

      // Clean up: keep only top 100 to save space
      await kv.zremrangebyrank('leaderboard', 0, -101);

      return response.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
      return response.status(500).json({ error: 'Failed to submit score' });
    }
  }

  return response.status(405).json({ error: 'Method not allowed' });
}
