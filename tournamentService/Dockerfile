FROM mhart/alpine-node:4.5

RUN npm install -g npm@3

RUN apk add --update \
              musl \
              build-base \
              python \
  && rm /var/cache/apk/*

# make some useful symlinks that are expected to exist
RUN cd /usr/bin \
  && ln -sf easy_install-2.7 easy_install \
  && ln -sf python2.7 python \
  && ln -sf python2.7-config python-config

COPY ./ /tmp/app/

RUN cd /tmp/app \
  && npm run build

WORKDIR /tmp/app

CMD ["npm", "run", "start"]