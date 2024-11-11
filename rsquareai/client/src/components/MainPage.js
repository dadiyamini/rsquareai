import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="cards">
        <Link to="/field-ai" className="card yellow">
          <h2>Field.AI</h2>
          <p>Optimizing services using AI Smart search, service & parts demand predictions, and real-time insights, enabling you to improve service quality and enhance customer satisfaction.</p>
        </Link>
        <Link to="/contract-ai" className="card gray">
          <h2>Contract.AI</h2>
          <p>Enhance contract performance, improve profitability, mitigate risks, and strengthen customer relationships through personalized contract offerings and optimized price.</p>
        </Link>
        <Link to="/price-ai" className="card orange">
          <h2>Price.AI</h2>
          <p>Recommend optimal parts price, competitive pricing analysis, and evaluate performance of pricing strategies. Ability to monitor and alert the price changes and segment customers based on their price sensitivity.</p>
        </Link>
        <Link to="/warranty-ai" className="card blue">
          <h2>Warranty.AI</h2>
          <p>AI Models & Insights to automate claims processing, identify suspicious information, improve dealer performance, and reduce warranty spend. Enhance quality of the claim and identify anomalies in images.</p>
        </Link>
        <Link to="/quality-ai" className="card red">
          <h2>Quality.AI</h2>
          <p>Analyzing claims, returns, and repairs to identify product quality issues, failure rates, and areas for improvement, enabling corrective actions to reduce post-sales costs.</p>
        </Link>
        <Link to="/connect-ai" className="card blue">
          <h2>Connect.AI</h2>
          <p>Turning data into insights: Predict machine failures, track asset utilization, and set up early warning alerts for anomaly detection.</p>
        </Link>
        <Link to="/knowledge-ai" className="card green">
          <h2>Knowledge.AI</h2>
          <p>Gen AI and Large Language Models to help improve operations, decision-making, and provide expertise to troubleshoot, automate, and take actions.</p>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
