import CandidateCard from "./CandidateCard";
import candidates from "../data/candidates";

function CandidateList() {
  return (
    <div className="candidate-list">
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
        />
      ))}
    </div>
  );
}

export default CandidateList;