const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/analyze', (req, res) => {
  const { profileLink, personalInfo } = req.body;

  const mockProfileData = {
    name: 'John Doe',
    phone: '+123456789',
    dob: '1990-01-01',
    country: 'United States'
  };

  let matchCount = 0;
  const totalFields = 4;

  if (personalInfo.name.toLowerCase() === mockProfileData.name.toLowerCase()) matchCount++;
  if (personalInfo.phone === mockProfileData.phone) matchCount++;
  if (personalInfo.dob === mockProfileData.dob) matchCount++;
  if (personalInfo.country.toLowerCase().includes(mockProfileData.country.toLowerCase())) matchCount++;

  const similarityPct = Math.round((matchCount / totalFields) * 100);

  let risk = 'Low';
  let threats = ['Low-level Data Exposure'];

  if (similarityPct >= 75) {
    risk = 'High';
    threats = ['Identity Theft', 'Physical Security Risk'];
  } else if (similarityPct >= 50) {
    risk = 'Medium';
    threats = ['Phishing Attacks'];
  }

  res.json({ similarityPct, risk, threats });
});

app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
