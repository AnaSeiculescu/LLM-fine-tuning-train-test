const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

// Define the paths
const docxFilePath = path.join(__dirname, "OfertaTest1.docx");
const jsonlFilePath = path.join(__dirname, "train1.jsonl");

async function docxToJsonl(docxFilePath, jsonlFilePath) {
    try {
        // Extract raw text from the .docx file asynchronously
        const { value: docxContent } = await mammoth.extractRawText({ path: docxFilePath });

        // Trim the content
        const trimmedContent = docxContent.trim();

        // Create a single JSON object
        const jsonObject = { text: trimmedContent };

        // Convert the JSON object to a JSON string
        const jsonString = JSON.stringify(jsonObject);

        // Write the JSON string to a JSONL file
        fs.writeFile(jsonlFilePath, jsonString, "utf8", (err) => {
            if (err) {
                console.error(`Error writing the file: ${err.message}`);
            } else {
                console.log(`JSONL file has been saved to ${jsonlFilePath}`);
            }
        });
    } catch (err) {
        console.error(`Error processing the file: ${err.message}`);
    }
}

docxToJsonl(docxFilePath, jsonlFilePath);
