```
version: '2.30.3'

services:
  mashiro-bot:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: mashiro-bot
    environment:
      - BOT_TOKEN={DISCORD_TOKEN}
    restart: unless-stopped

```

replace {DISCORD_TOKEN} with your bot token.