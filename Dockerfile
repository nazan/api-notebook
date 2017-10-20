#FROM devdocker.mulesoft.com:18078/base/ubuntu:trusty-1.5.0-31-g1dc737a
FROM ubuntu:trusty

# Intall build dependencies
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      python \
 && rm -rf /var/lib/apt/lists/*

# Add app user
RUN groupadd -r app && useradd -r -g app app

# Set env vars
ENV NODE_ENV 'development'
ENV NODE_CONFIG_PERSIST_ON_CHANGE 'N'
ENV URL 'http://localhost:3000'
ENV TITLE 'ABC - API Notebook'
ENV EMBED_SCRIPT 'http://localhost:3000/scripts/embed.js'
ENV GITHUB_CLIENT_ID 'abc'
ENV GITHUB_CLIENT_SECRET 'abc'

# Folder to deploy artifacts
RUN mkdir -p /usr/src/app && chown -R app:app /usr/src/app
WORKDIR /usr/src/app
COPY ./artifacts /usr/src/app/
COPY server.py /usr/src/app/

EXPOSE 3000

# Change to user with lower privileges
USER app

CMD python server.py '/' 3000
