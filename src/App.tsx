import {BrowserRouter, Route, Routes} from "react-router-dom";
import type {Dispatch,FC} from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./Components/Background";
import Navbar from "./Components/Navbar";
import Portfolio from "./Pages/Portfolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./Components/ProjectDetails.jsx";
import WelcomeScreen from "./Pages/WelcomeScreen";
import {AnimatePresence} from 'framer-motion';
import React,{useState} from "react";

interface LoadingPageProps {
    showWelcome: boolean;
    setShowWelcome: Dispatch<React.SetStateAction<boolean>>;
}

const LoadingPage: FC<LoadingPageProps> = ({ showWelcome, setShowWelcome }) => {
    const year = new Date().getFullYear()

    return (
        <>
            <AnimatePresence mode="wait">
                {showWelcome && (
                    <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
                )}
            </AnimatePresence>
            {!showWelcome && (
                <>
                    <Navbar />
                    <AnimatedBackground />
                    <Home />
                    <About />
                    <Portfolio />
                    <ContactPage />
                    <footer>
                        <center>
                            <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
                            <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                © {year+" "}
                                <a href="https://flowbite.com/" className="hover:underline">
                  Slysl™
                </a>
                . All Rights Reserved.
              </span>
                        </center>
                    </footer>
                </>
            )}
        </>
    );
};


const ProjectPageLayout = () => {
    const year = new Date().getFullYear()

    return(
    <>
        <ProjectDetails />
        <footer>
            <center>
                <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
                <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © {year+"  "}
                    <a href="https://flowbite.com/" className="hover:underline">
            Slysl
          </a>
          . All Rights Reserved.
        </span>
            </center>
        </footer>
    </>
)};

function App() {
    const [showWelcome, setShowWelcome] = useState(true);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoadingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
                <Route path="/project/:id" element={<ProjectPageLayout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

