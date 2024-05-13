// UploadImage.js

import React from 'react';

function About_Us() {
    return (<div className="text-white flex flex-wrap justify-between mx-10">
        <div className="my-5 flex flex-wrap justify-center">
            <img
                src="/assets/hammad.png"
                alt="Hammad Anwar"
                className="w-80 h-80"
            />
            <div className="flex flex-col">
                <div className="flex">
                    <p className=" mx-4 w-20 font-bold">Name:</p> 
                    <p className="">Hammad Anwar</p>
                </div>
                <div className="flex">
                    <p className=" mx-4 w-20 font-bold">Interests:</p> 
                    <p className="">UI/UX Design, AI, Backend Development</p>
                </div>
                <div className="flex">
                    <p className=" mx-4 w-20 font-bold">Skills:</p> 
                    <p className="">C++, Python, Figma, Flask, Azure</p>
                </div>
            </div>
        </div>
        <div className="my-5 flex flex-wrap justify-center">
            <img
                src="/assets/basim.png"
                alt="Basim Mehmood"
                className="w-80 h-80"
            />
            <div className="flex flex-col">
                <div className="flex">
                    <p className=" mx-4 w-20 font-bold">Name:</p> 
                    <p className="">Basim Mehmood</p>
                </div>
                <div className="flex">
                    <p className=" mx-4 w-20 font-bold">Interests:</p> 
                    <p className="">Competitive Programming, AI, Blockchain, Stock Trading</p>
                </div>
                <div className="flex">
                    <p className=" mx-4 w-20 font-bold">Skills:</p> 
                    <p className="">C++, Python, Tensorflow, Solidity</p>
                </div>
            </div>
        </div>
        <div className="my-5 flex flex-wrap justify-center">
            <img
                src="/assets/mujtaba.png"
                alt="Mujtaba Omar"
                className="w-80 h-80"
            />
            <div className="flex flex-col">
                <div className="flex">
                    <p className=" mx-4 w-20 font-bold">Name:</p> 
                    <p className="">Mujtaba Omar</p>
                </div>
                <div className="flex">
                    <p className=" mx-4 w-20 font-bold">Interests:</p> 
                    <p className="">Competitive Programming, AI, Mobile Development</p>
                </div>
                <div className="flex">
                    <p className=" mx-4 w-20 font-bold">Skills:</p> 
                    <p className="">C++, Python, Flutter</p>
                </div>
            </div>
        </div>
    </div>);
}

export default About_Us;
