import { expect } from "chai";
import { ethers } from "hardhat";
describe("Voting Contract", function () {

  async function deployContract() {
    const Voting = await ethers.getContractFactory("Voting");

    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    return voting;
  }

  it("Should deploy successfully", async function () {
    const voting = await deployContract();

    expect(await voting.getAddress()).to.not.equal(
      ethers.ZeroAddress
    );
  });

});