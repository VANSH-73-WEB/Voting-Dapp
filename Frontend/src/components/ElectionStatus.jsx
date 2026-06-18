function ElectionStatus() {
  return (
    <div className="status-card">
      <h2>Election Status</h2>

      <p>
        Status:
        <span className="active"> Active</span>
      </p>

      <p>Total Candidates: 3</p>

      <p>Total Votes: 295</p>
    </div>
  );
}

export default ElectionStatus;