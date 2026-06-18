import Navbar from "../components/Navbar";
import ElectionStatus from "../components/ElectionStatus";
import CandidateList from "../components/CandidateList";
import Results from "../components/Results";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <div className="container">
        <ElectionStatus />

        <h2>Candidates</h2>

        <CandidateList />

        <Results />
      </div>

      <Footer />
    </>
  );
}

export default Home;