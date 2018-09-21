# README

KEYS
* GMAPS_API_KEY
* SECRET_KEY_BASE


# Todo:
* blog // https://marketplace.ghost.org/
* animations/ http://barbajs.org/
* images resize
* about us page
* seo tags/fb tags/title/description
* open project and logo page
* admin for settings
* GA and other scripts
# game
* shop?
* HTTPS

# Для Сивака:
- Головна
- відкритий проект
- про нас
- іконка мови en


```
docker-machine create --driver digitalocean --digitalocean-access-token=XXXXX --digitalocean-size=1gb --digitalocean-region=fra1 brendari

eval (docker-machine env brendari)

docker-compose up -d

# run some tasks
docker exec -it brendari_rails_app_1 bundle exec rails db:reset

# build app and reload
docker-compose build app
docker-compose up --no-deps -d app

# copy assets to nginx
docker cp brendari_rails_app_1:/rails_app/public/assets /tmp/
docker cp /tmp/assets brendari_rails_web_1:/rails_app/public/
docker cp brendari_rails_app_1:/rails_app/public/packs /tmp/
docker cp /tmp/packs brendari_rails_web_1:/rails_app/public/

```

# Deploy
Redeploys only app container
```
./deploy.sh
```