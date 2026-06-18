function CandidateCard({ candidate }) {
  return (
    <div className="candidate-card">
      <img src={candidate.image} alt={candidate.name} />

      <h3>{candidate.name}</h3>

      <p>{candidate.party}</p>

      <button className="vote-btn">
        Vote
      </button>
    </div>
  );
}

export default CandidateCard;