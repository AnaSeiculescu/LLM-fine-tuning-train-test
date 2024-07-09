const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

async function docxToJsonl(docxFilePath, jsonlFilePath) {
    try {
        // Extract raw text from the .docx file asynchronously
        const { value: docxContent } = await mammoth.extractRawText({ path: docxFilePath });

        // Trim the content
        const trimmedContent = docxContent.trim();

        // String processing according to the Llama 2 model template
        let processedContent = `<s>[INST]${trimmedContent}</s>`;
        processedContent = processedContent.replace("Oferta pentru firma", "[/INST]Oferta pentru firma");

        // Create a single JSON object
        const jsonObject = { text: processedContent };

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

let docxFilePath;
let jsonlFilePath;

for (let i = 1; i < 15; i++) {
    docxFilePath = path.join(__dirname, `OfertaTest${i}.docx`);
    jsonlFilePath = path.join(__dirname, `train${i}.jsonl`);

    docxToJsonl(docxFilePath, jsonlFilePath);
}
