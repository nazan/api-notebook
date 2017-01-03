#!/bin/bash
npm install

npm run build

npm prune --production && \
rm -rf ./output && \
mkdir ./output && \
cd ./build && \
cp -R {./authenticate,./font,./images,./scripts,./plugins,./styles,embed.html,embedded.html,favicon.ico,index.html} ../output && \
cd ../ && \
tar -czvf api-notebook.tar.gz -C ./output . && \
mv api-notebook.tar.gz ./output
