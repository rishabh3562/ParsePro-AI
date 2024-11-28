const express = require('express');
const { GoogleAIFileManager } = require('@google/generative-ai/server');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const multer = require('multer');
const cloudinary = require('cloudinary').v2; // Using Cloudinary SDK
const mime = require('mime-types');
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Google AI API
const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Cloudinary config (ensure your Cloudinary details are in .env)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup for file uploads (handling form-data)
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage }).single('file'); // 'file' is the field name in the form-data

// Endpoint to process file upload and generate content using Google AI
app.post('/upload-file', upload, async (req, res) => {
    const { displayName } = req.body;  // Get displayName from form-data
    const file = req.file; // Get file from form-data
    console.log("file:", req.file)
    console.log("Received file:", file ? file.originalname : 'No file');
    console.log("Received displayName:", displayName);

    // Debugging check for 'file'
    if (!file || !file.buffer) {
        return res.status(400).json({ error: 'No valid file buffer available' });
    }

    try {
        // Step 1: Upload the file to Cloudinary using upload_stream
        const cloudinaryResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },  // Automatically detect file type (image, pdf, etc.)
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
            );

            // Pipe the buffer into the upload stream (using uploadStream.end)
            uploadStream.end(file.buffer);  // Pass the buffer here
        });

        console.log("Cloudinary upload result:", cloudinaryResponse);

        // Step 2: Return the file URL to use in Google Gemini
        const fileUrl = cloudinaryResponse.secure_url;
        console.log("Cloudinary file URL:", fileUrl);

        // Step 3: Pass the file URL to Google Gemini or other processing
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const generateResponse = await model.generateContent([
            "Tell me about this file.",
            {
                fileData: {
                    fileUri: fileUrl,
                    mimeType: file.mimetype,
                },
            },
        ]);

        console.log("Generated content:", generateResponse);

        // Step 4: Return the generated content
        res.json({
            data: generateResponse.response,
            text: generateResponse.response.candidates[0].content.parts[0].text,
        });
    } catch (error) {
        console.error('Error during file processing:', error);
        res.status(500).json({
            error: 'An error occurred while processing the request',
            msg: error.message,
        });
    }
});


// Endpoint to list all uploaded images
app.get('/list-uploaded-images', async (req, res) => {
    try {
        console.log("Listing all uploaded files...");

        // Step 1: List files using Google AI File Manager
        const listFilesResponse = await fileManager.listFiles();
        console.log("Files retrieved from Google AI File Manager:", listFilesResponse);

        // Step 2: Extract file details and format the response
        const files = listFilesResponse.files.map((file) => ({
            name: file.name,
            displayName: file.displayName,
            uri: file.uri
        }));

        console.log("Formatted files list:", files);

        // Step 3: Send the response back with the list of files
        res.json({
            success: true,
            files: files,
        });
    } catch (error) {
        console.error('Error listing files:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while listing the files.',
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
