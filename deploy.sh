#!/bin/bash
docker-compose build app
docker-compose up --no-deps -d app
docker cp brendari_rails_app_1:/rails_app/public/assets /tmp/
docker cp /tmp/assets brendari_rails_web_1:/rails_app/public/
docker cp brendari_rails_app_1:/rails_app/public/packs /tmp/
docker cp /tmp/packs brendari_rails_web_1:/rails_app/public/
