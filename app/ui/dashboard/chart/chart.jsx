"use client";
import styles from './chart.module.css';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: "Mon",
    visit: 3000,
    click: 1398,
  },
  {
    name: "Tue",
    visit: 2000,
    click: 1234,
  },
  {
    name: "Wed",
    visit: 1500,
    click: 2345,
  },
  {
    name: "Thu",
    visit: 3500,
    click: 3456,  
  },
  {
    name: "Fri",
    visit: 2500,
    click: 2346,  
  },
  {
    name: "Sat",
    visit: 500,
    click: 123,  
  },
  {
    name: "Sun",
    visit: 4000,
    click: 6789,  
  },
];

const Chart = () => {

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Recap</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line type="monotone" dataKey="visit" stroke="#8884d8" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="click" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;