import React from "react";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div>
      <Sidebar />
      <div>
        {/* Your card content goes here */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Card Title</h5>
            <p className="card-text">Some card content goes here.</p>
            {/* Add more content to your card */}
          </div>
        </div>
      </div>
    </div>
  );
}
