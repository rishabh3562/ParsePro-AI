import axios from 'axios';

export const extractDataFromFile = async (file) => {
    try {
        // Step 1: Upload file using FormData to Gemini API's file upload endpoint
        const formData = new FormData();
        formData.append('file', file);
        const api = import.meta.VITE_REACT_GEMINI_API_KEY
        const uploadResponse = await axios.post('https://api.google.com/gemini/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${api}`,  // Use your actual API key
            },
        });

        const fileUri = uploadResponse.data.uri;
        console.log(`File uploaded. URI: ${fileUri}`);
   
        // Step 2: Use the file URI to call the generation endpoint
        const generateResponse = await axios.post('https://api.google.com/gemini/generateContent', {
            fileUri: fileUri,
            text: "Can you summarize this document?",
        }, {
            headers: {
                'Authorization': `Bearer ${api}`,  // Use your actual API key
            },
        });

        // Step 3: Return the generated content
        return generateResponse.data;
    } catch (error) {
        console.error('Error extracting data:', error);
        return null;
    }
};

// import { GoogleAIFileManager } from "@google/generative-ai/server";

// const fileManager = new GoogleAIFileManager('api key');

// export const extractDataFromFile = async (file) => {
//     try {
//         // Upload the file
//         const uploadResponse = await fileManager.uploadFile(file, {
//             mimeType: 'application/pdf', // Change MIME type based on your file
//             displayName: file.name,
//         });

//         console.log(`File uploaded: ${uploadResponse.file.uri}`);

//         // Call the model using the file URI
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//         const result = await model.generateContent([
//             {
//                 fileData: {
//                     mimeType: uploadResponse.file.mimeType,
//                     fileUri: uploadResponse.file.uri,
//                 },
//             },
//             { text: "Can you summarize this document?" },
//         ]);

//         return result.response.text();
//     } catch (error) {
//         console.error('Error extracting data: ', error);
//         return null;
//     }
// };

// // import axios from 'axios';

// // export const extractDataFromFile = async (file) => {
// //     try {
// //         const formData = new FormData();
// //         formData.append('file', file);

// //         const response = await axios.post('https://api.google.com/gemini/extract', formData, {
// //             headers: {
// //                 'Content-Type': 'multipart/form-data',
// //             },
// //         });

// //         return response.data;
// //     } catch (error) {
// //         console.error('Error extracting data: ', error);
// //         return null;
// //     }
// // };

// // // import axios from 'axios';

// // // export const extractDataFromFile = async (file) => {
// // //     const formData = new FormData();
// // //     formData.append('file', file);

// // //     try {
// // //         const response = await axios.post('YOUR_GEMINI_API_URL', formData, {
// // //             headers: {
// // //                 'Content-Type': 'multipart/form-data',
// // //             },
// // //         });
// // //         return response.data;
// // //     } catch (error) {
// // //         console.error('Error extracting data:', error);
// // //         return null;
// // //     }
// // // };
