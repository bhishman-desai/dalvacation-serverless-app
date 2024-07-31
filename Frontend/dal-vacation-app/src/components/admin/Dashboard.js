import React from "react";

function Dashboard() {
  const role = localStorage.getItem("Role")
  return (
    <>
    {role === "PropertyAgent" ? (
      <>
      <div>
        <iframe
          title="Dashboard"
          src="https://lookerstudio.google.com/reporting/408b54ff-6fda-4911-9f3b-39e7f6ebfe59/page/1M"
          frameborder="0"
          style={{ border: 0, width: "100%", height: "800px" }}
          allowfullscreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        ></iframe>
      </div>
      </>
    ) : (
      <div>Access Denied</div>
    )}
    </>
  );
}

export default Dashboard;
