FROM kthse/kth-nodejs:12.0.0
LABEL maintainer="KTH-Webb web-developers@kth.se"

WORKDIR /application
ENV NODE_PATH /application

ENV TZ Europe/Stockholm

COPY ["package.json", "package.json"]
COPY ["package-lock.json", "package-lock.json"]

COPY ["config", "config"]
COPY ["i18n", "i18n"]
COPY ["server", "server"]
COPY ["public", "public"]

COPY [".babelrc.json", ".babelrc.json"]
COPY ["build.sh", "build.sh"]
COPY ["app.js", "app.js"]
COPY ["webpack.config.js", "webpack.config.js"]

RUN apk stats && \
    chmod a+rx build.sh && \
    apk add --no-cache bash && \
    apk add --no-cache --virtual .gyp-dependencies python make g++ util-linux && \
    npm install --unsafe-perm && \
    npm run build && \
    npm prune --production && \
    apk del .gyp-dependencies && \
    apk stats

EXPOSE 3000

CMD ["npm", "start"]
