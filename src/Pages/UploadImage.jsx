// UploadImage.js

import React, { useState } from 'react';

function UploadImage(props) {
    const { imageData, setImageData, downloadedFlag, setDownloadedFlag, file, setFile } = props;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);

        const url = "http://127.0.0.1:5000";

        const response = await fetch(`${url}/upload`, {
            method: 'POST',
            body: formData,
        }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } return response.json()
            }).then(data => {
                console.log("data", data)
                console.log("response received")
                if (data["message"] === "failed") {
                    throw new Error('Upload failed');
                }

                console.log("message success")
                data["labels"].sort((a, b) => a.localeCompare(b));
                setImageData(data);
                setDownloadedFlag(true);
            })
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([imageData["labels"].join("\n")], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "list.txt";
        document.body.appendChild(element); // Required for this to work in Firefox
        element.click();
    };

    return (
        <div className="flex flex-col items-center mx-10">
            <div className="text-white font-bold text-4xl self-center">
                Welcome to our Attendance Vision Project
            </div>
            <div className="mx-10 self-center mt-5">
                <div className="text-white text-xl self-end font-bold">
                    Presented by:
                </div>
                <div className="text-white text-lg self-end mx-10">
                    <ul>Hammad Anwar</ul>
                    <ul>Mujtaba Omar</ul>
                    <ul>Syed Basim Mehmood</ul>
                </div>
            </div>
            <div className="text-white text-2xl my-10">
                Upload an Image of the Classroom Here
            </div>
            <div className="mx-10">
                <form className="text-white flex flex-col" onSubmit={handleSubmit}>
                    <div className="">
                        <input className=" cursor-pointer" type="file" name="image" onChange={handleFileChange} />
                    </div>
                    <div className="my-5">
                        {/* <span className=" text-white bg-blue-900 hover:text-gray-300 px-4 py-2 rounded-2xl"> */}
                        <span className=" text-black bg-white hover:bg-gray-200 hover:text-gray-700 px-5 py-1 font-bold">
                            <button type="submit">Upload</button>
                        </span>
                    </div>
                </form>
                {downloadedFlag && <div className="text-white">
                    <p className="text-xl font-bold"> Attendance </p>
                    <p>{imageData.labels.join(", ")}</p>
                    <div className="my-5">
                        {/* <span className=" text-white bg-blue-900 hover:text-gray-300 px-4 py-2 rounded-2xl"> */}
                        <span className=" text-black bg-white hover:bg-gray-200 hover:text-gray-700 px-5 py-1 font-bold">
                            <button type="submit" onClick={downloadTxtFile}>Download List</button>
                        </span>
                    </div>
                    {/* Display image if imageData contains valid base64 image */}
                    {imageData.image && imageData.extension &&
                        <img src={`data:image/${imageData.extension};base64,${imageData.image}`} alt="Flask Image" />
                    }
                </div>}
            </div>
        </div>
    );
}

export default UploadImage;
