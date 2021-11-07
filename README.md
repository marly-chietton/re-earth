# re-earth

> re-earth website

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# utils
Si le port se superposent avec nginx (80) il faut stop nginx et kill les PID.
C'est bien le docker qui porte la conf nginx donc docker s'occupe de rediriger le flux via les ports (80:80 443:443)

Pour kill PID nginx :
Simple search for linux utility using following command

netstat -nlp | grep 8888
It'll show processing running at this port, then kill that process using PID (look for a PID in row) of that process.

kill PID

