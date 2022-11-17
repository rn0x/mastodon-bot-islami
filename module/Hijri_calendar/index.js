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

import { launch } from 'puppeteer';
import moment_hijri from 'moment-hijri';
import CrateHtml from './CrateHtml.js';
import css from './css.js';

/**
 * @example 

import Hijri_calendar from './hijri_calendar'

let filename = './example.png'
let title = 'أذكار ' 
let text = 'اللّهم اغفر لي، وإهدني، وأرزقني، وعافني، أعوذ بالله من ضيق المقام يوم القيامة'


* await Hijri_calendar(title, text, filename).then(e => {
*     console.log(e); // return array
* });

or

let calendar = await Hijri_calendar(title, text, filename);

console.log(calendar);


 * @param {string} title - العنوان
 * @param {string} text - النص
 * @param {string} filename - مسار حفظ الصورة
 * @returns {array} 
 - filename
 - today
 - Hijri
 - Gregorian

 **/

export default async function Hijri_calendar(title, text, filename) {

    let browser = await launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }).catch(error => console.log(error));
    let page = await browser?.newPage();
    let today = moment_hijri().locale('ar-SA').format('dddd'); // اليوم
    let Hijri = moment_hijri().locale('ar-SA').format('iYYYY/iM/iD'); // التاريخ الهجري
    let Gregorian = moment_hijri().locale('ar-SA').format('L'); // التاريخ الميلادي
    let Html = CrateHtml(today, Hijri, Gregorian, title, text); // return code html
    await page?.setViewport({ width: 500, height: 50 });
    await page?.setContent(Html, {
        waitUntil: 'load',
        timeout: 0
    }); // file index.html || code html 
    await page?.addStyleTag({ content: css() }); // file css
    await page?.screenshot({ path: filename, fullPage: true });
    await browser?.close();
    return {
        filename: filename,
        today: today,
        Hijri: Hijri,
        Gregorian: Gregorian
    }
}
