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

import path from 'path';
import { launch } from 'puppeteer';
import crateHtml from './crateHtml.js';

export default async function screenshot({ quran: quran, tafser1: tafser1, tafser2: tafser2, english: english, name: name, username: username, filename: filename }) {

    await crateHtml({ quran: quran, tafser1: tafser1, tafser2: tafser2, english: english, name: name, username: username }).then(async () => {

        let __dirname = path.resolve();
        let browser = await launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }).catch(error => console.log(error));
        let page = await browser.newPage();
        let html = `file:${path.join(__dirname, './module/searchQuran/index.html')}`;
        await page?.goto(html, { waitUntil: 'load' });
        await page?.setViewport({ width: 900, height: 200 });
        await page?.screenshot({ path: filename, fullPage: true });
        await browser?.close();

    });

    return {
        filename: filename
    }

}