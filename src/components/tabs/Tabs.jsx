import React from "react";
import "./tabs.scss";

const Tabs = ({ selectedTab, setSelectedTab }) => {
  const tabs = ["All", "Active", "Completed"];

  const handleChange = (event) => {
    setSelectedTab(event.target.value);
  };

  return (
    <div className="tabs_container">
      <select
        className="tabs_dropdown"
        value={selectedTab}
        onChange={handleChange}
      >
        {tabs.map((tab) => (
          <option key={tab} value={tab}>
            {tab}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Tabs;
