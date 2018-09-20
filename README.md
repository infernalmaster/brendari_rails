# README

KEYS
* GMAPS_API_KEY
* SECRET_KEY_BASE


# Todo:
* seo tags/fb tags/title/description
* blog // https://marketplace.ghost.org/
* shop?
* animations/ http://barbajs.org/
* images resize
* deploy
* about us page
* open project and logo page
* admin for settings


```
docker-machine create --driver digitalocean --digitalocean-access-token=XXXXX --digitalocean-size=1gb --digitalocean-region=fra1 brendari

eval (docker-machine env brendari)

docker-compose build app

docker-compose up -d

docker exec -it projects_mongodb_1 bash

docker cp brendari_rails_app_1:/rails_app/public/assets /tmp/ & docker cp /tmp/assets brendari_rails_web_1:/rails_app/public/ & docker cp brendari_rails_app_1:/rails_app/public/packs /tmp/ & docker cp /tmp/packs brendari_rails_web_1:/rails_app/public/
```