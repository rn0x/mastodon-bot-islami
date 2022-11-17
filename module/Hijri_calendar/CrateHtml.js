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

import fs from "fs-extra";
import path from 'path';

export default function CrateHtml(today, Hijri, Gregorian, title, text) {
	
    let __dirname = path.resolve();
    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <p id="Calendar_top">التقويم الهجري</p>
        <div id="date">
            <p id="today">${today}</p>
            <div id="data_block">
                <p>${Hijri}</p>
                <p>${Gregorian}</p>
            </div>
        </div>
        <div id="d3a">
            <p id="d3a_top">${title}</p>
            <p id="d3a_text">${text}</p>
        </div>
        
        <div id="bottom">
            <p id="telegram"> </p>
        </div>
        
    </body>
    </html>`
    return html
}
