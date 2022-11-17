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

import fetch from 'node-fetch';

export default async function searchQuran(text, type) {

    // type = للبحث في الآيات : search || تفسير الجلالين : tafser1 || تفسير الميسر : tafser2 || شرح الآيات باللغة الإنجليزية : english
    let response = await fetch(`https://api-quran.cf/quransql/index.php?text=${text}&type=${type}`, { method: 'GET' }).catch(error => console.log(error));
    let data = await response?.json();

    return data?.result ? data?.result[0] : false

}