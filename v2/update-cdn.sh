#!/bin/sh

mkdir cdn
cp ./*.js cdn/
cp ./*.js.map cdn/
MAJOR_VERSION=$(jq ".version" package.json | sed s/\"//g | tr . '\n' | head -n 1)
aws s3 sync cdn "s3://airship-cdn/$MAJOR_VERSION/" --acl public-read
