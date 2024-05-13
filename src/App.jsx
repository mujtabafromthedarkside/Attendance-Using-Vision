// App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './Pages/Home';
import UploadImage from './Pages/UploadImage';
import Test from './Pages/Test';
import About_Us from './Pages/About_Us';

function App() {
    const [downloadedFlag, setDownloadedFlag] = useState(false);
    const [imageData, setImageData] = useState({
        message: "",
        labels: [],
        image: "",
        extension: ""
    });
    const [file, setFile] = useState(null);

    return (
        <Router>
            <div className="bg-gray-800 min-h-screen">
                <nav className="bg-gray-900 p-4 mb-8">
                    <ul className="flex justify-center">
                        <li className="mr-6">
                            <Link to="/" className="text-white hover:text-gray-300">Upload Image</Link>
                        </li>
                        {/* <li className="mr-6">
                            <Link to="/test" className="text-white hover:text-gray-300">Test</Link>
                        </li> */}
                        <li className="mr-6">
                            <Link to="/AboutUs" className="text-white hover:text-gray-300">About Us</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element=
                        {<UploadImage imageData={imageData} downloadedFlag={downloadedFlag} file={file} setImageData={setImageData} setDownloadedFlag={setDownloadedFlag} setFile={setFile} />}
                    />
                    {/* <Route path="/test" element={<Test />} /> */}
                    <Route path="/AboutUs" element={<About_Us />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
