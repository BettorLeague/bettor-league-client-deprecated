#!/bin/bash
docker pull nadjim/bettor-league-client
docker-compose -f /angular-client/docker-compose.yml down
docker-compose -f /angular-client/docker-compose.yml up -d
