# Mashiro Bot

```
version: '2.30.3'

services:
  mashiro-bot:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: mashiro-bot
    environment:
      - BOT_TOKEN={BOT_TOKEN}
      - BOT_OWNER_ID={BOT_OWNER_ID}
    restart: unless-stopped

```

replace {DISCORD_TOKEN} with your bot token. <br>
replace {BOT_OWNER_ID} with your bot owner user id.
