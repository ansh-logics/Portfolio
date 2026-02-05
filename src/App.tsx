import "./App.css";
import Blur from "./components/overlay/Blur";
import Color from "./components/overlay/Color";
import Noise from "./components/overlay/Noise";
import Navbar from "./components/ui/Navbar";
import Work from "./components/pages/Work";
import AllProjects from "./components/pages/AllProjects";
import { About } from "./components/pages/About";
import FigmaPluginPage from "./components/pages/FigmaPluginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contact } from "./components/sections/Contact";
import Hero from "./components/sections/Hero";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Noise />
              <Blur />
              <Color />
              <Navbar />
              <main className="flex flex-col items-center justify-between bg-[#0A0A0A] relative">
                <hr className="w-full bg-gradient-to-l from-[#0A0A0A] via-[rgba(255,255,255,0.1)] to-[#0A0A0A] border-0 h-px" />
                <section className="h-[fit-content] mb-[100px] w-full">
                  <Hero></Hero>
                </section>
                <section className="h-[fit-content] mb-[100px] w-full relative z-10">
                  <About />
                </section>
                <section className="h-[fit-content] mb-[100px] w-full relative z-10">
                  <Work />
                </section>
                <section id="contact" className="h-[fit-content] w-full relative z-10">
                  <Contact />
                </section>
              </main>
            </>
          } />
        <Route
          path="/projects"
          element={
            <>
              <Noise />
              <Blur />
              <Color />
              <Navbar />
              <AllProjects />
            </>
          }
        />
        <Route
          path="/figma-plugin"
          element={
            <>
              <Noise />
              <Blur />
              <Color />
              <Navbar />
              <FigmaPluginPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
