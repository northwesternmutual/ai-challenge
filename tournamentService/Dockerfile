FROM mhart/alpine-node:6.9

RUN npm install -g yarn@latest

RUN apk add --update \
              musl \
              build-base \
              python && \
  	rm /var/cache/apk/* && \
  	cd /usr/bin && \
  	ln -sf easy_install-2.7 easy_install && \
  	ln -sf python2.7 python && \
  	ln -sf python2.7-config python-config

WORKDIR /tmp/app

COPY yarn.lock package.json .yarnrc /tmp/app/

RUN yarn

COPY ./ /tmp/app/

CMD ["npm", "run", "start"]