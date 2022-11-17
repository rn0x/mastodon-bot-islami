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

import fs from 'fs-extra';
import path from 'path';

export default async function crateHtml({ quran: quran, tafser1: tafser1, tafser2: tafser2, english: english, name: name, username: username }) {


    let __dirname = path.resolve();
    let codeHtml = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
    </head>
    
    <body>
    
        <img src="./image/logo.png" id="logo">
    
        <div id="Content">
    
            <p id="quran">${quran}</p>
            <div class="Content_q">
                <p class="Content_q_title">تفسير الجلالين</p>
                <p class="Content_q_text">${tafser1}</p>
            </div>
    
            <div class="Content_q">
                <p class="Content_q_title">تفسير الميسر</p>
                <p class="Content_q_text">${tafser2}</p>
            </div>
    
            <div class="Content_q">
                <p class="Content_q_title">شرح الآيات باللغة الإنجليزية</p>
                <p class="Content_q_text" id="Content_q_en">${english}</p>
            </div>
    
        </div>
    
        <div class="bottom">
            <p>${name}</p>
            <p>${username}</p>
        </div>
    
    
    </body>
    
    </html>`

    fs.writeFileSync(path.join(__dirname, './module/searchQuran/index.html'), codeHtml);

}