import Header from "./components/Header";
import ToolRoom from "./components/ToolRoom";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Navbar from "./components/Navbar";
import Experience from "./components/Experience";

function App() {
  return (
    <>
      <section className="relative overflow-x-hidden bg-slate-950 font-exospace">
        <Header />
        <ToolRoom />
        <Projects />
        <Experience />
        <Education />
        {/* <Navbar /> */}
      </section>
    </>
  );
}

export default App;
