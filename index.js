const Axios = require('axios-observable').Axios;

const endpoint = process.env.npm_config_url;

let currentPage = 1;

if (!endpoint) {
    console.log('no url provided');
    return;
}

const firstResponse = (response) => {
    pages = parseInt(response.headers['x-wp-totalpages'], 10);

    // This is good, but sometimes the response data comes back in an object, not an iterable array(?)
    //response.data.map( ( {link} ) => console.log(link) );

    Object.keys(response.data).map( (key) => console.log(response.data[key].link) );

    // If there's only one page of results, output the links and exit.
    if ( pages === 1 ) { 
        return;
    } 

    //Start processing page 2
    currentPage = currentPage +1;

    while (currentPage < pages) {
        const nextPageURL = `${endpoint}?page=${currentPage}`;

        Axios.get(nextPageURL)
            .subscribe(
                response => response.data.map( ({link}) => console.log(link) ),
                error => console.log(error),
            );

        currentPage = currentPage +1;
    }
}

//Initial load
Axios.get(endpoint)
    .subscribe(
        response => firstResponse(response),
        error => console.log(error)
    );