# README

KEYS
* SECRET_KEY_BASE


# Todo:
* GA and other scripts
* animations/ http://barbajs.org/
* рандомні картинки на головну

# Ideas
* images resize
* game
* shop?
* blog // https://marketplace.ghost.org/

# Block
* open project and logo page
* about us page
* HTTPS
* відео з логотипами на головну

# Для Сивака:
- Головна
- відкритий проект
- про нас
- іконка мови en
- favicon

може використати епловський шрифт?́
body {
font-family: SF Pro Text,-apple-system,-apple-system-font,Helvetica Neue,Helvetica,Verdana,Arial,sans-serif;
}

# strange things
* old yarn have bug and installs dev deps on prod and this causes errors ("xo": "^0.23.0"). But there is no newer yarn for ruby:2.5.1-alpine3.7.


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
eval (docker-machine env brendari)

./deploy.sh
```

# Rake tasks
```
brendari:logos_seeds
brendari:projects_seeds
brendari:configs_seeds
brendari:user_seeds
translations:merge[en]
translations:merge[uk]
```
