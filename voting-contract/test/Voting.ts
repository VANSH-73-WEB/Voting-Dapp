import { expect } from "chai";
import hre from "hardhat";

const { ethers } = await hre.network.connect();

describe("Voting Contract", function () {
  async function deployVoting() {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    await voting.waitForDeployment();

    return voting;
  }

  it("Should deploy with 3 default candidates", async function () {
    const voting = await deployVoting();

    expect(await voting.getCandidateCount()).to.equal(3n);
  });

  it("Should have correct first candidate", async function () {
    const voting = await deployVoting();

    const candidate = await voting.getCandidate(1);

    expect(candidate[0]).to.equal(1n);
    expect(candidate[1]).to.equal("John Doe");
    expect(candidate[2]).to.equal(0n);
  });

  it("Should have correct second candidate", async function () {
    const voting = await deployVoting();

    const candidate = await voting.getCandidate(2);

    expect(candidate[0]).to.equal(2n);
    expect(candidate[1]).to.equal("Sarah Smith");
    expect(candidate[2]).to.equal(0n);
  });

  it("Should have correct third candidate", async function () {
    const voting = await deployVoting();

    const candidate = await voting.getCandidate(3);

    expect(candidate[0]).to.equal(3n);
    expect(candidate[1]).to.equal("Mike Johnson");
    expect(candidate[2]).to.equal(0n);
  });

  it("Should allow voting", async function () {
    const voting = await deployVoting();

    await voting.vote(1);

    const candidate = await voting.getCandidate(1);

    expect(candidate[2]).to.equal(1n);
  });

  it("Should prevent double voting", async function () {
    const voting = await deployVoting();

    await voting.vote(1);

    await expect(voting.vote(2)).to.be.revertedWith("Already voted");
  });

  it("Should reject invalid candidate", async function () {
    const voting = await deployVoting();

    await expect(voting.vote(4)).to.be.revertedWith("Invalid candidate");
  });

  it("Should allow different users to vote", async function () {
    const voting = await deployVoting();

    const [, user1, user2] = await ethers.getSigners();

    await voting.connect(user1).vote(1);
    await voting.connect(user2).vote(1);

    const candidate = await voting.getCandidate(1);

    expect(candidate[2]).to.equal(2n);
  });

  it("Should return winner after voting", async function () {
    const voting = await deployVoting();

    const [, user1, user2] = await ethers.getSigners();

    await voting.connect(user1).vote(2);
    await voting.connect(user2).vote(2);

    const winner = await voting.getWinner();

    expect(winner[0]).to.equal("Sarah Smith");
    expect(winner[1]).to.equal(2n);
  });

  it("Should return tie when candidates have equal votes", async function () {
    const voting = await deployVoting();

    const [, user1, user2] = await ethers.getSigners();

    await voting.connect(user1).vote(1);
    await voting.connect(user2).vote(2);

    const winner = await voting.getWinner();

    expect(winner[0]).to.contain("Tie between");
    expect(winner[1]).to.equal(1n);
  });
});