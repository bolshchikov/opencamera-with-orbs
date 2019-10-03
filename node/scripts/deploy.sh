#!/usr/bin/env bash

heroku container:push web -a open-camera-registry
heroku container:release web -a open-camera-registry