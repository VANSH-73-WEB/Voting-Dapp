// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    uint public candidateCount;
Candidate[] public candidates;
    mapping(address => bool) public voters;

    constructor() {
        addCandidate("John Doe");
        addCandidate("Sarah Smith");
        addCandidate("Mike Johnson");
    }

    function addCandidate(string memory _name) private {
        candidateCount++;

       candidates.push(Candidate(
        candidateCount,
        _name,
        0
        ));
    }

    function vote(uint _candidateId) public {

        require(
            !voters[msg.sender],
            "Already voted"
        );

        require(
            _candidateId > 0 &&
            _candidateId <= candidateCount,
            "Invalid candidate"
        );

        voters[msg.sender] = true;

        candidates[_candidateId-1].voteCount++;
    }

    function getCandidate(uint _id)
        public
        view
        returns (
            uint,
            string memory,
            uint
        )
    {
        Candidate memory candidate =
            candidates[_id];

        return (
            candidate.id,
            candidate.name,
            candidate.voteCount
        );
    }

    function getCandidateCount()
        public
        view
        returns(uint)
    {
        return candidateCount;
    }
function getWinner() public view returns (string memory winnerName, uint256 maxVotes) {
    require(candidates.length > 0, "No candidates yet");

    uint256 highestVotes = 0;

    // Find highest vote count
    for (uint256 i = 0; i < candidates.length; i++) {
        if (candidates[i].voteCount > highestVotes) {
            highestVotes = candidates[i].voteCount;
        }
    }

    // Count how many candidates have highest votes
    uint256 tieCount = 0;
    for (uint256 i = 0; i < candidates.length; i++) {
        if (candidates[i].voteCount == highestVotes) {
            tieCount++;
        }
    }

    // No tie
    if (tieCount == 1) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount == highestVotes) {
                return (candidates[i].name, highestVotes);
            }
        }
    }

    // Tie case
    string memory result = "Tie between ";

    for (uint256 i = 0; i < candidates.length; i++) {
        if (candidates[i].voteCount == highestVotes) {
            result = string.concat(result, candidates[i].name);

            tieCount--;

            if (tieCount > 0) {
                result = string.concat(result, " and ");
            }
        }
    }

    return (result, highestVotes);
}

}