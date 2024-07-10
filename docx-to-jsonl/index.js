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
        let processedContent = `<s>[INST]<<SYS>>Answer only in the Romanian language. Raspunde numai in limba romana.
Raspunsul trebuie sa fie un plan de dezvoltare a unei aplicatii web sau mobile, in functie de necesitate.
Raspunsul trebuie sa tina cont de cerintele clientului. Planul de development va fi aplicat de firma de IT. 
Domeniul de activitate al firmei este Software Development.
<</SYS>>Urmatorul este cerinta clientului:${trimmedContent}</s>`;

        const processedContentReplacement = `Pe baza acestora formuleaza un plan de dezvoltare a unei aplicatii web sau 
mobile, in functie de necesitate. Planul de dezvoltare are 4 sectiuni principale: "1.Scopul documentului", 
"2.Structura proiectului", "3.Sugestii suplimentare" si "4.Pret si timp de implementare".[/INST]Oferta pentru firma`;

        processedContent = processedContent.replace("Oferta pentru firma", processedContentReplacement);

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

for (let i = 1; i < 17; i++) {
    docxFilePath = path.join(__dirname, `OfertaTest${i}.docx`);
    jsonlFilePath = path.join(__dirname, `train${i}.jsonl`);

    docxToJsonl(docxFilePath, jsonlFilePath);
}
