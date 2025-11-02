import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './App.css';

const rawData = `date,sex,age,abs,rate
2017-01-01,female,all,203741,24.48
2017-01-01,female,< 20,10038,1.99
2017-01-01,female,20-24,59295,57.73
2017-01-01,female,25-29,81555,142.66
2017-01-01,female,30-34,28678,108.07
2017-01-01,female,35-39,11423,71.4
2017-01-01,female,40-44,5477,48.65
2017-01-01,female,45-49,3287,28.72
2017-01-01,female,50-54,1997,13.77
2017-01-01,female,55-59,1083,6.9
2017-01-01,female,60-64,546,3.09
2017-01-01,female,65+,362,0.66
2017-01-01,male,all,203741,23.03
2017-01-01,male,< 20,2835,0.53
2017-01-01,male,20-24,36307,28.07
2017-01-01,male,25-29,85997,93.42
2017-01-01,male,30-34,41256,96.2
2017-01-01,male,35-39,16595,74.57
2017-01-01,male,40-44,7946,67.42
2017-01-01,male,45-49,4391,56.54
2017-01-01,male,50-54,3143,44.59
2017-01-01,male,55-59,2170,35.43
2017-01-01,male,60-64,1389,22.76
2017-01-01,male,65+,1712,8.79
2018-01-01,female,all,206352,24.7
2018-01-01,female,< 20,9673,1.9
2018-01-01,female,20-24,58471,57.2
2018-01-01,female,25-29,81862,141.8
2018-01-01,female,30-34,29965,112.0
2018-01-01,female,35-39,12219,72.7
2018-01-01,female,40-44,5893,52.0
2018-01-01,female,45-49,3714,32.3
2018-01-01,female,50-54,2303,15.5
2018-01-01,female,55-59,1233,7.7
2018-01-01,female,60-64,618,3.3
2018-01-01,female,65+,401,0.7
2018-01-01,male,all,206352,23.3
2018-01-01,male,< 20,2857,0.5
2018-01-01,male,20-24,36607,28.4
2018-01-01,male,25-29,85835,92.0
2018-01-01,male,30-34,42331,97.9
2018-01-01,male,35-39,16833,73.0
2018-01-01,male,40-44,8202,68.7
2018-01-01,male,45-49,4717,60.1
2018-01-01,male,50-54,3185,45.3
2018-01-01,male,55-59,2348,37.4
2018-01-01,male,60-64,1474,23.2
2018-01-01,male,65+,1963,9.6
2019-01-01,female,all,203661,24.4
2019-01-01,female,< 20,9107,1.8
2019-01-01,female,20-24,55276,54.9
2019-01-01,female,25-29,81876,142.2
2019-01-01,female,30-34,29638,110.7
2019-01-01,female,35-39,12736,73.2
2019-01-01,female,40-44,6308,55.1
2019-01-01,female,45-49,3800,33.1
2019-01-01,female,50-54,2480,16.5
2019-01-01,female,55-59,1309,8.0
2019-01-01,female,60-64,701,3.7
2019-01-01,female,65+,430,0.7
2019-01-01,male,all,203661,23.1
2019-01-01,male,< 20,2851,0.5
2019-01-01,male,20-24,34625,27.3
2019-01-01,male,25-29,85217,92.0
2019-01-01,male,30-34,41143,95.2
2019-01-01,male,35-39,17431,73.9
2019-01-01,male,40-44,8208,67.9
2019-01-01,male,45-49,4851,61.4
2019-01-01,male,50-54,3211,45.9
2019-01-01,male,55-59,2576,40.4
2019-01-01,male,60-64,1597,24.4
2019-01-01,male,65+,1951,9.2
2020-01-01,female,all,184589,22.1
2020-01-01,female,< 20,7907,1.6
2020-01-01,female,20-24,51825,52.4
2020-01-01,female,25-29,75019,131.6
2020-01-01,female,30-34,25433,95.0
2020-01-01,female,35-39,11116,62.4
2020-01-01,female,40-44,5438,46.6
2020-01-01,female,45-49,3277,28.6
2020-01-01,female,50-54,2140,14.1
2020-01-01,female,55-59,1294,7.7
2020-01-01,female,60-64,654,3.3
2020-01-01,female,65+,486,0.8
2020-01-01,male,all,184589,21.1
2020-01-01,male,< 20,2430,0.5
2020-01-01,male,20-24,33394,26.8
2020-01-01,male,25-29,79590,87.3
2020-01-01,male,30-34,35574,82.7
2020-01-01,male,35-39,14892,62.5
2020-01-01,male,40-44,6912,56.2
2020-01-01,male,45-49,3955,49.8
2020-01-01,male,50-54,2544,36.5
2020-01-01,male,55-59,2066,32.1
2020-01-01,male,60-64,1419,21.0
2020-01-01,male,65+,1813,8.1
2021-01-01,female,all,215973,25.5
2021-01-01,female,< 20,7797,1.5
2021-01-01,female,20-24,60087,59.7
2021-01-01,female,25-29,91355,157.5
2021-01-01,female,30-34,29935,109.8
2021-01-01,female,35-39,12689,70.0
2021-01-01,female,40-44,5968,50.2
2021-01-01,female,45-49,3616,31.0
2021-01-01,female,50-54,2052,13.3
2021-01-01,female,55-59,1271,7.5
2021-01-01,female,60-64,729,3.6
2021-01-01,female,65+,474,0.7
2021-01-01,male,all,215973,22.7
2021-01-01,male,< 20,2248,0.4
2021-01-01,male,20-24,39269,29.1
2021-01-01,male,25-29,95980,97.1
2021-01-01,male,30-34,42005,90.1
2021-01-01,male,35-39,16953,65.6
2021-01-01,male,40-44,7611,57.1
2021-01-01,male,45-49,4073,47.4
2021-01-01,male,50-54,2692,35.6
2021-01-01,male,55-59,1920,27.5
2021-01-01,male,60-64,1362,18.6
2021-01-01,male,65+,1860,7.7
2022-01-01,female,all,214824,25.5
2022-01-01,female,< 20,7104,1.4
2022-01-01,female,20-24,52995,52.8
2022-01-01,female,25-29,86754,150.0
2022-01-01,female,30-34,33896,124.7
2022-01-01,female,35-39,15254,84.3
2022-01-01,female,40-44,7753,65.4
2022-01-01,female,45-49,4761,40.9
2022-01-01,female,50-54,2871,18.7
2022-01-01,female,55-59,1785,10.5
2022-01-01,female,60-64,1018,5.1
2022-01-01,female,65+,633,1.0
2022-01-01,male,all,214824,22.7
2022-01-01,male,< 20,1945,0.3
2022-01-01,male,20-24,35456,26.4
2022-01-01,male,25-29,88437,89.9
2022-01-01,male,30-34,44374,95.7
2022-01-01,male,35-39,19423,75.6
2022-01-01,male,40-44,9544,71.9
2022-01-01,male,45-49,5417,63.3
2022-01-01,male,50-54,3430,45.6
2022-01-01,male,55-59,2625,37.8
2022-01-01,male,60-64,1834,25.1
2022-01-01,male,65+,2339,9.7`;

function App() {
  const [viewType, setViewType] = useState('trends');
  const [metric, setMetric] = useState('abs');

  // Parse CSV data
  const parsedData = useMemo(() => {
    const lines = rawData.trim().split('\n');
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const [date, sex, age, abs, rate] = lines[i].split(',');
      data.push({
        date: date.substring(0, 4),
        sex,
        age,
        abs: parseFloat(abs),
        rate: parseFloat(rate)
      });
    }
    return data;
  }, []);

  // Prepare data for age group trends
  const trendData = useMemo(() => {
    const filtered = parsedData.filter(d => d.age !== 'all');
    const grouped = {};
    
    filtered.forEach(row => {
      const key = `${row.date}-${row.age}`;
      if (!grouped[key]) {
        grouped[key] = { year: row.date, age: row.age, female: 0, male: 0 };
      }
      grouped[key][row.sex] = row[metric];
    });
    
    return Object.values(grouped);
  }, [parsedData, metric]);

  // Prepare data for 2022 age distribution
  const ageDistributionData = useMemo(() => {
    const year2022 = parsedData.filter(d => d.date.startsWith('2022') && d.age !== 'all');
    return year2022.map(d => ({
      age: d.age,
      [d.sex]: d[metric]
    })).reduce((acc, curr) => {
      const existing = acc.find(item => item.age === curr.age);
      if (existing) {
        Object.assign(existing, curr);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  }, [parsedData, metric]);

  // Prepare data for overall trends
  const totalTrendData = useMemo(() => {
    const totals = parsedData.filter(d => d.age === 'all');
    return totals.reduce((acc, curr) => {
      const existing = acc.find(item => item.year === curr.date);
      if (existing) {
        existing[curr.sex] = curr[metric];
      } else {
        acc.push({ year: curr.date, [curr.sex]: curr[metric] });
      }
      return acc;
    }, []);
  }, [parsedData, metric]);

  const ageGroups = ['< 20', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65+'];

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <h1 className="app-title">Marriage Statistics Analysis (2017-2022)</h1>
        <p className="app-subtitle">Explore marriage trends by age group and gender</p>
        
        <div className="card">
          <div className="controls-container">
            <div className="control-group">
              <label className="control-label">View Type</label>
              <select 
                value={viewType} 
                onChange={(e) => setViewType(e.target.value)}
                className="control-select"
              >
                <option value="trends">Overall Trends</option>
                <option value="ageGroup">By Age Group (2022)</option>
                <option value="ageGroupTrend">Age Group Trends</option>
              </select>
            </div>
            
            <div className="control-group">
              <label className="control-label">Metric</label>
              <select 
                value={metric} 
                onChange={(e) => setMetric(e.target.value)}
                className="control-select"
              >
                <option value="abs">Absolute Numbers</option>
                <option value="rate">Marriage Rate</option>
              </select>
            </div>
          </div>

          {viewType === 'trends' && (
            <div>
              <h2 className="section-title">Total Marriages Over Time</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={totalTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="female" stroke="#ec4899" strokeWidth={2} name="Female" />
                  <Line type="monotone" dataKey="male" stroke="#3b82f6" strokeWidth={2} name="Male" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {viewType === 'ageGroup' && (
            <div>
              <h2 className="section-title">Marriages by Age Group (2022)</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={ageDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="female" fill="#ec4899" name="Female" />
                  <Bar dataKey="male" fill="#3b82f6" name="Male" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {viewType === 'ageGroupTrend' && (
            <div>
              <h2 className="section-title">Marriage Trends by Age Group</h2>
              <div className="grid-container">
                {ageGroups.slice(0, 6).map(ageGroup => {
                  const groupData = trendData.filter(d => d.age === ageGroup);
                  return (
                    <div key={ageGroup} className="age-card">
                      <h3 className="age-card-title">Age {ageGroup}</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={groupData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="female" stroke="#ec4899" strokeWidth={2} />
                          <Line type="monotone" dataKey="male" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="section-title">Key Insights</h2>
          <div className="insights-grid">
            <div className="insight-box insight-blue">
              <h3 className="insight-title">Peak Marriage Ages</h3>
              <p className="insight-text">Females: 25-29 years old</p>
              <p className="insight-text">Males: 25-29 and 30-34 years old</p>
            </div>
            <div className="insight-box insight-pink">
              <h3 className="insight-title">COVID-19 Impact</h3>
              <p className="insight-text">Significant drop in marriages during 2020, with recovery in 2021</p>
            </div>
            <div className="insight-box insight-purple">
              <h3 className="insight-title">Age Trends</h3>
              <p className="insight-text">Marriages in 30-34 and 35-39 age groups showing growth post-2020</p>
            </div>
            <div className="insight-box insight-green">
              <h3 className="insight-title">Young Marriages</h3>
              <p className="insight-text">Declining trend in marriages under age 20 across all years</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;