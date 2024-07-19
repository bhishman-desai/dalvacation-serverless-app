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
          src="https://lookerstudio.google.com/embed/reporting/0947bce2-e2d9-4ba7-8316-648c12ab4ba0/page/1M"
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
