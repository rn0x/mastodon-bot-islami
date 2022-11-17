# mastodon-bot-islami


```json
{
    "url": "https://bassam.social",
    "token": "dXrHdmX2beeiCPDe-gaFN10pBNmKPH7FMpz6POKLAwg",
    "posts_id_searchQuran": "109353466072304119"
}
```

posts_id_searchQuran = معرف منشور الباحث القرآني

# Linux


```bash
   > sudo apt-get install nodejs
   > sudo apt-get install git
   > sudo apt-get install google-chrome-stable
   > git clone https://github.com/rn0x/mastodon-bot-islami
   > cd mastodon-bot-islami
   > npm i
   > npm start
```




<br><br>

(Windows) PowerShell Administrator

install choco

```bash

Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

```

```bash
   > choco install nodejs.install
   > choco install git
   > choco install googlechrome
   > git clone https://github.com/rn0x/mastodon-bot-islami
   > cd mastodon-bot-islami
   > npm i
   > npm start
```

# Android [ Termux ]

```bash
   > pkg update && pkg upgrade
   > pkg install proot-distro
   > proot-distro install alpine
   > proot-distro login alpine
   > apk update && apk add --no-cache nmap && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
  apk update && \
  apk add --no-cache \
  chromium
   > apk add --update nodejs npm git
   > git clone https://github.com/rn0x/mastodon-bot-islami
   > cd mastodon-bot-islami
   > npm i
   > npm start
```


# الترخيص 

[MIT](https://github.com/rn0x/mastodon-bot-islami/blob/main/LICENSE)
