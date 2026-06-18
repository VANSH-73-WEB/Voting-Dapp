import { BrowserProvider, Contract } from "ethers";
import VotingArtifact from "../contract/VotingABI.json";
import { CONTRACT_ADDRESS } from "../contract/contractAddress";

export const getContract = async () => {
  const provider = new BrowserProvider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();

  return new Contract(
    CONTRACT_ADDRESS,
    VotingArtifact.abi,
    signer
  );
};