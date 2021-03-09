# inspect-web

Collects and presents the collected Google Lighthouse results.

## Quickrun

1.  Clone the repo
    ```bash
    $ git clone git@github.com:KTH/inspect-web
    ```
2.  Install dependencies
    ```bash
    $ npm install
    ```
3.  Create a `.env` file in the root of the project

    ```
    LDAP_URI=ldaps://[username]@ldap.ref.ug.kth.se
    LDAP_PASSWORD=[password]
    AZURE_BLOB_SAS_CONNECTION_STRING=[SAS connection string for our Azure Blob storage]
    ```

4.  Start your Redis

5.  Build and start the app

    _NOTE: Due to a how Parcel (v2-Beta currently used in this project) handles how external libraries refers to Node.js specific packages (in this case 'Buffer') it's not currently working to use 'parcel watch'._

    ```bash
    $ npm run build
    $ npm run start-dev
    ```

And go to http://localhost:3000/inspect

# license

Copyright 2020 KTH

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
