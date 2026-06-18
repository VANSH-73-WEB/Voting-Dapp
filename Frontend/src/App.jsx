import {useState,useEffect } from "react";
import { getContract } from "./utils/contract";
import { toast } from "react-toastify";
function App() {
  const [account , setAccount] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [winner, setWinner] = useState(null);
const [loading, setLoading] = useState(true);


  const connectwallet = async () =>{
    const account = await window.ethereum.request({
        method: "eth_requestAccounts",
  
    });
    setAccount(account[0]);

  }


  const voteCandidate = async(candidateId) => {
    try{
      const contract = await getContract();

      const tx = await contract.vote(candidateId);

      await tx.wait();
      await fetchCandidates();
await getwinner();
    toast.success("Vote Cast Successfully!");

      fetchCandidates();
    }
    catch(error){
  toast.error("You have already voted!");
  console.error(error);
}
  };
  const fetchCandidates = async () => {
  try {
    setLoading(true);

    const contract = await getContract();

    const count = Number(await contract.candidateCount());

    const candidateList = [];

    for (let i = 0; i < count; i++) {
      const candidate = await contract.candidates(i);

      candidateList.push({
        id: Number(candidate[0]),
        name: candidate[1],
        voteCount: Number(candidate[2]),
      });
    }

    setCandidates(candidateList);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false); // always stop loading
  }
};
  const getwinner = async () => {
  try {
    const contract = await getContract();
    const result = await contract.getWinner();
    
    console.log("Winner:", result[0]);
    console.log("Votes:", result[1]);

    setWinner({
      name: result[0],
      votes: result[1].toString()
    });

  } catch (error) {
    console.error(error);
  }
};

const totalVotes = candidates.reduce(
  (sum, candidate) => sum + candidate.voteCount,
  0
);
useEffect(() => {
  connectwallet();
  fetchCandidates();
  setLoading(true);
// fetch data
setLoading(false);
}, []);
if (loading) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-2xl font-bold">
        Loading Candidates...
      </h1>
    </div>
  );
}
 return (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-3xl mx-auto">

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg mb-8">
  <h1 className="text-4xl font-bold text-center">
    🗳️ Blockchain Voting DApp
  </h1>
  <p className="text-center mt-2 text-blue-100">
    Secure & Transparent Voting on Blockchain
  </p>
</div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="font-semibold text-gray-700">
          Wallet:
        </h3>
        <p className="text-gray-500 break-all">
         {account.slice(0,6)}...{account.slice(-4)}
        </p>
      </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {candidates.map((candidate) => (
       <div
  key={candidate.id}
  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 flex flex-col h-[280px]"
>
 <div className="flex justify-between items-start min-h-[70px]">
   <h2 className="text-2xl font-bold text-gray-800 leading-tight">
      {candidate.name}
    </h2>

   <span className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full text-sm flex items-center justify-center text-center shrink-0">
      ID #{candidate.id}
    </span>
  </div>

  <p className="mt-4 text-lg text-gray-600">
    🗳️ Votes:
    <span className="font-bold ml-2">
      {candidate.voteCount}
    </span>
  </p>
<div className="mt-auto">
  <button
    disabled={hasVoted}
    onClick={() => voteCandidate(candidate.id)}
    className={`w-full mt-5 py-3 rounded-xl font-semibold transition ${
  hasVoted
    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
    : "bg-blue-600 hover:bg-blue-700 text-white"
}`}
      >
    {hasVoted ? "Already Voted" : "Vote Now"}
  </button>
    </div>
</div>
        ))}
      </div>
      <div className="bg-blue-100 p-4 rounded-xl mt-4">
  Total Votes Cast: {totalVotes}
</div>
{winner && (
  <div
    className={`mt-8 rounded-xl p-6 shadow-lg ${
      winner.name.startsWith("Tie between")
        ? "bg-gray-200 border-l-8 border-gray-500"
        : "bg-yellow-100 border-l-8 border-yellow-500"
    }`}
  >
    <h2
      className={`text-2xl font-bold ${
        winner.name.startsWith("Tie between")
          ? "text-gray-700"
          : "text-yellow-700"
      }`}
    >
      {winner.name.startsWith("Tie between")
        ? "🤝 Election Tied"
        : "🏆 Election Winner"}
    </h2>

    {winner.name.startsWith("Tie between") ? (
      <p className="mt-3 text-lg font-medium">
        {winner.name}
      </p>
    ) : (
      <p className="mt-2 text-lg">
        <strong>Name:</strong> {winner.name}
      </p>
    )}

    <p className="text-lg">
      <strong>Total Votes:</strong> {winner.votes}
    </p>
  </div>
)}
<button
  onClick={getwinner}
  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md"
>
  🏆 Show Winner
</button>
    </div>
  </div>
);
}

export default App;