// Import required modules
const fetch = require('node-fetch'); 
const { URLSearchParams } = require('url');
const fs = require('fs');

(async () => {
    // Initialize form data
    const formData = new URLSearchParams({
        createserialkey: '',
        dpdProductName: '1',
        txtEmail: 'abc@def.com',
        txtItemNo: '123',
        txtOrderNo: '123',
        dpdExpiry: '5'
    });

    // Request options
    const opts = {
        method: 'POST',
        headers: {
            cookie: 'ASPSESSIONIDQWQDADTB=BFLKPJMDBAKNFIJHILNHKIAB'
        },
        body: formData
    };

    // Regular expression to extract the key
    const keyRegex = /(\w{4}-\w{4}-\w{4})<br \/>/;

    while (true) {
        try {
            // Send POST request
            const response = await fetch('https://www.pcoptimizerpro.com/admin/docreatelicense.asp', opts);

            // Get response text
            const data = await response.text();

            // Check if the response contains a valid key
            if (keyRegex.test(data)) {
                const key = data.match(keyRegex)[1];

                // Log and save the key
                console.log(key);
                fs.appendFile('keys.txt', `[Key] ${key} `, (err) => {
                    if (err) {
                        console.error('Error writing to file:', err);
                    }
                });
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    }
})();