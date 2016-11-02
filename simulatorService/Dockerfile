FROM mhart/alpine-node:6.9

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

COPY package.json /tmp/app/package.json

RUN npm install

COPY ./ /tmp/app/

CMD ["npm", "run", "start"]