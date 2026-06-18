import { FaWallet } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Voting DApp</h2>

      <button className="wallet-btn">
        <FaWallet />
        Connect Wallet
      </button>
    </nav>
  );
}

export default Navbar;