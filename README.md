# WP URL Grabber

Grabs urls from WP API; it looks at the `x-wp-totalpages` parameter in the header to iteratively page through all the results.

## Usage

First run `npm install` to setup dependencies.

The script can be run through `npm run` like so:

```bash
npm run get --url=http://demo.wp-api.org/wp-json/wp/v2/posts | tee output/urls.txt
```

This rough version just extracts the links and sends them to the console, where they can be sent to a file through bash commands.