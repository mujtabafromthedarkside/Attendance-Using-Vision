// UploadImage.js

import React, { useState } from 'react';

function UploadImage() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);

        const url = "http://127.0.0.1:5000";

        // try {
        //     const response = await fetch(`${url}/upload`, {
        //         method: 'POST',
        //         body: formData
        //     });
        //     const data = await response.json();
        //     console.log(data); // handle response from server
        // } catch (error) {
        //     console.error('Error:', error);
        // }
        const response = await fetch(`${url}/upload`, {
            method: 'POST',
            body: formData,
        }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="flex flex-col items-start">
            <div className="text-white font-bold text-2xl my-10 self-center">
                Upload an Image of the Classroom
            </div>
            <div className="mx-10">
                <form className="text-white flex flex-col" onSubmit={handleSubmit}>
                    <div className="">
                        <input className=" cursor-pointer" type="file" name="image" onChange={handleFileChange} />
                    </div>
                    <div className="my-5">
                        {/* <span className=" text-white bg-blue-900 hover:text-gray-300 px-4 py-2 rounded-2xl"> */}
                        <span className=" text-black bg-white hover:text-gray-600 px-5 py-1 font-bold">
                            <button type="submit">Upload</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadImage;
