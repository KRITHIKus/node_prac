const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

// Endpoint to fetch India vs South Africa match data
app.get('/match-data', async (req, res) => {
  try {
    const response = await axios.get('https://api.sportsradar.com/cricket/trial/v2/en/matches.json', {
      headers: {
        'Authorization': `Bearer ${process.env.SPORTS_RADAR_API_KEY}`
      }
    });

    // Filter data based on India and South Africa teams
    const matches = response.data.matches;
    const indiaSouthAfricaMatch = matches.find(match => 
      (match.home_team.name === 'India' && match.away_team.name === 'South Africa') || 
      (match.home_team.name === 'South Africa' && match.away_team.name === 'India')
    );

    if (indiaSouthAfricaMatch) {
      res.json(indiaSouthAfricaMatch);
    } else {
      res.status(404).json({ message: 'India vs South Africa match not found' });
    }
  } catch (error) {
    console.error('Error fetching data from Sports Radar:', error);
    res.status(500).json({ message: 'An error occurred while fetching match data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
