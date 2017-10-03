#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Print shell input lines as they are read
set -v

# Clean dist and package folder
rm -rf dist
rm -rf artifact

mkdir dist
mkdir artifact

# Get package name and version
PACKAGE_NAME="api-tooling-api-notebook-core"
PACKAGE_VERSION=`node -e "console.log(require('./package.json').version);"`

# If not running in JENKINS
if [ -z ${JENKINS_PROCESS} ]; then
  # Install all dependencies
  npm install
else
  echo 'Skipping npm install in build script since running in JENKINS'
fi

# Shrinkwrap
#npm shrinkwrap

# Git revision
npm run git:version -- dist/VERSION

# Copy assets
cp -r package.json dist/

# Install production dependencies in dist
npm install --silent --production --prefix dist --userconfig=.npmrc

# Copy
cp -r src dist/
cp -r config dist/

# Create Tar
tar -czf artifact/${PACKAGE_NAME}-${PACKAGE_VERSION}.tar.gz -C dist .
