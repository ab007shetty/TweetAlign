const express = require('express');
const TwitterApi = require('twitter-api-v2').default;
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

app.post('/analyze', async (req, res) => {
  const { username } = req.body;

  try {
    console.log(`Fetching user by username: ${username}`);
    const user = await twitterClient.v2.userByUsername(username);

    if (!user.data) {
      console.error("User not found");
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`User found: ${user.data.id}. Fetching tweets...`);
    const tweets = await twitterClient.v2.userTimeline(user.data.id, {
      max_results: 100,
      exclude: 'retweets',
      expansions: 'referenced_tweets.id', // To include replies
      'tweet.fields': 'referenced_tweets'
    });

    if (!tweets.data) {
      console.error("No tweets found");
      return res.status(404).json({ error: 'No tweets found' });
    }

    console.log("Tweets fetched successfully. Analyzing tweets...");
    const results = analyzeTweets(tweets.data);

    console.log("Analysis complete. Sending response...");
    res.json({ inclination: results });
  } catch (error) {
    console.error("Error occurred during analysis:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error fetching or analyzing tweets' });
  }
});

const analyzeTweets = (tweets) => {
  // Placeholder for actual analysis logic
  // Analyze tweets for political inclination
  return {
    leftist: 40,
    rightist: 30,
    neutral: 30,
  };
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
