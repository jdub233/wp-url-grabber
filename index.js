const axios = require('axios');

const endpoint = process.env.npm_config_url;

if (!endpoint) {
    console.log('no url provided');
    return;
}

const getEndpoint = url => axios.get(url);

(async function get() {
    const firstResponse = await getEndpoint(endpoint);
    
    // Extract the number of total pages in the response.
    const pages = parseInt(firstResponse.headers['x-wp-totalpages'], 10);

    // Extract the link field from the first batch and send it to the console.
    firstResponse.data.map( ({link}) => console.log(link) );

    for (let i = 2; i <= pages; i++) {
        const response = await getEndpoint(`${endpoint}?page=${i}`);
        // Send link fields for the remaining batches to the console as they sequentially resolve.
        response.data.map( ({link}) => console.log(link) );
    }
})();
