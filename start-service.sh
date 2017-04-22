#!/usr/bin/env bash

docker service create --replicas 1 --name api-service -l=apiRoute='/movies' -p 3000:3000 chris/api-service
