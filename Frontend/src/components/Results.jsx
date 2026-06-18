import candidates from "../data/candidates";

function Results() {
  return (
    <div className="results">
      <h2>Election Results</h2>

      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className="result-item"
        >
          <h4>{candidate.name}</h4>

          <div className="bar">
            <div
              className="fill"
              style={{
                width: `${candidate.votes / 1.5}%`
              }}
            ></div>
          </div>

          <p>{candidate.votes} Votes</p>
        </div>
      ))}
    </div>
  );
}

export default Results;