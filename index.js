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

import Mastodon from './module/Mastodon.js';
import { convert } from 'html-to-text';
import fs from 'fs-extra';
import fetch from "node-fetch";
import moment_hijri from 'moment-hijri';
import searchQuran from './module/searchQuran.js';
import screenshot from './module/searchQuran/index.js';
import file_size from './module/file_size.js';
import Hijri_calendar from './module/Hijri_calendar/index.js';
import path from 'path';



let config = fs.readJSONSync('./config.json');
let client = new Mastodon(config?.url, config?.token);

console.log('Starting Bot Mastodon :', moment_hijri().locale('en-EN').format('LT'));

await client.Notifications('mention', async e => {

    let account = {
        id: e?.account?.id,
        username: e?.account?.username,
        display_name: e?.account?.display_name,
        url: e?.account?.url,
        avatar: e?.account?.avatar
    }
    let status = {
        id: e?.status?.id,
        created_at: e?.status?.created_at,
        in_reply_to_id: e?.status?.in_reply_to_id,
        uri: e?.status?.uri,
        content: convert(e?.status?.content)?.split(']')[1]?.replace(/\n/g, '') || convert(e?.status?.content)?.split('@')[0]?.replace(/\n/g, '')
    }

    if (status.in_reply_to_id === config?.posts_id_searchQuran) {

        let search = await searchQuran(status?.content?.replace(/\n/g, ''), 'search').catch(e => console.log(e));
        let tafser1 = await searchQuran(status?.content?.replace(/\n/g, ''), 'tafser1').catch(e => console.log(e));
        let tafser2 = await searchQuran(status?.content?.replace(/\n/g, ''), 'tafser2').catch(e => console.log(e));
        let english = await searchQuran(status?.content?.replace(/\n/g, ''), 'english').catch(e => console.log(e));


        if (search || tafser1 || tafser2 || english) {
            search = search?.split('\n')[0]
            tafser1 = tafser1?.split(search)[1]?.split('--------------\n')[0]
            tafser2 = tafser2?.split(search)[1]?.split('--------------\n')[0]
            english = english?.split(search)[1]?.split('--------------\n')[0]
            let scrQuran = await screenshot({
                quran: search,
                tafser1: tafser1,
                tafser2: tafser2,
                english: english,
                name: account.display_name,
                username: '@' + account.username,
                filename: './files/image/searchQuran.png'
            }).catch(e => console.log(e));
            let buffer = fs.readFileSync(scrQuran?.filename);
            let up = await client.Upload(buffer).catch(e => console.log(e));
            await client.Publish('#تفسير_الجلالين #تفسير_الميسر #القرآن_الكريم', up?.id, status.id).catch(e => console.log(e));
        }

        else {

            await client.Publish(`لم يتم التعرف على الكلمة ! @${account.username}`, undefined, status.id).catch(e => console.log(e));

        }

    }

}).catch(e => console.log(e));


setInterval(async () => {

    let time = moment_hijri().locale('en-EN').format('LT');

    if (time === '7:00 PM') {

        let mp3quran = fs.readJsonSync('./files/json/mp3quran.json');
        let quran = fs.readJsonSync('./files/json/Quran.json');

        let random = quran[Math.floor(Math.random() * quran.length)];
        let number = String(random?.Number).padStart(3, 0);
        let mp3json = mp3quran[random?.Number - 1];
        let surah_name = random?.Name;
        let the_reader = mp3json?.name;
        let url = `${mp3json?.Server}/${number}.mp3`;
        let FileSize = await file_size(url);
        let text = `ـ ❁ …\n\n\nسورة #${surah_name}\nالقارئ #${the_reader} \n\n\n#quran #islamic #islam #bassam`;

        console.log(FileSize);

        if (FileSize?.split('.')[0] <= 39 && FileSize?.split(' ')[1] === 'MB' || FileSize?.split(' ')[1] === 'KB') {

            let res = await fetch(url).catch(e => console.log(e));
            let buffer = Buffer.from(await res?.arrayBuffer());
            let up = await client.Upload(buffer).catch(e => console.log(e));

            if (up?.id) {
                await client.Publish(text, up?.id).catch(e => console.log(e));
            }
        }

    }

    else if (time === '12:02 AM') {


        let adhkar = fs.readJsonSync('./files/json/adhkar.json');
        let random = adhkar[Math.floor(Math.random() * adhkar.length)];
        let random_array = random?.array[Math.floor(Math.random() * random?.array?.length)];
        let category = random?.category;
        let text = random_array?.text;
        let filename = './files/image/Hijri_calendar.png';

        await Hijri_calendar(category, text, filename).then(async event => {

            let buffer = fs.readFileSync(event?.filename);
            let text = '#التقويم_الهجري 📅\n\n'
            text += `اليوم: #${event?.today}\n`
            text += `التاريخ الهجري: ${event?.Hijri}\n`
            text += `التاريخ الميلادي: ${event?.Gregorian} \n\n\n #islamic #islam #bassam #calendar`
            let up = await client.Upload(buffer).catch(e => console.log(e));

            if (up?.id) {
                await client.Publish(text, up?.id).catch(e => console.log(e));
            }

        }).catch(error => console.log(error));

    }

    else if (time === '11:30 AM') {


        let video = fs.readJsonSync('./files/json/video.json');
        let random = video[Math.floor(Math.random() * video.length)];
        let res = await fetch(random?.path).catch(e => console.log(e));
        let buffer = Buffer.from(await res?.arrayBuffer());
        let up = await client.Upload(buffer).catch(e => console.log(e));
        let text = 'ـ ❁ …\n\n\nارح سمعك وقلبك 💛 \n\n\n#فيديو_عشوائي #قرآن #بسام #quran #islamic #islam #bassam';
        
        if (up?.id) {
            await client.Publish(text, up?.id).catch(e => console.log(e));
        }

    }

}, 60000);


await client.EventTag(false, undefined, async e => {

    console.log(convert(e?.content) + '\n___________');
    await client.like(e?.id).catch(e => console.log(e));
    
}).catch(e => console.log(e));
