//             Mastodon - Bot Islami
//            Copyright (c) 2022 rn0x
//            https://github.com/rn0x

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import https from 'https';
import http from 'http';

/**
 * @example 
 * import file_size from './file_size.js';
 * let size await file_size_url("https://example.com")
 * console.log(size)
 * @param {string} url - url of file
 * @returns {Promise} resolves once complete, otherwise rejects
 **/

export default async (url) => {

    if (!url) return Promise.reject(new Error('Invalid Url'));

    return new Promise(async (res, rej) => {

        try {

            if (url.startsWith('https://') || url.startsWith('http://')) {

                let req = url.startsWith('https://') ? https.get(url) : http.get(url);
                req.once("response", async r => {
                    let c = parseInt(r.headers['content-length']);
                    if (!isNaN(c) && r.statusCode === 200) res(formatBytes(c));
                    else res("Couldn't get file size");
                });
                req.once("error", async e => rej(e));

            }

            else {

                throw 'error: The address should be http or https'
            }

        } catch (error) {

            console.log(error);
        }
    });
};

function formatBytes(x) {
    let units = ['B', 'KB', 'MB', 'GB', 'TB']
    let bytes = x
    let i;

    for (i = 0; bytes >= 1024 && i < 4; i++) {
        bytes /= 1024;
    }

    return bytes.toFixed(2) + ' ' + units[i];
}