#!/usr/bin/env bash

function benchmark () {
	echo "Testing $1: GET /v1/echo"

	cd $1;
	yarn start > /dev/null &
	server_pid=$!

	sleep 1

	echo "GET http://localhost:8080/v1/echo" | vegeta attack -duration=60s -rate=0 -max-workers=4 | tee results.bin | vegeta report

	kill $server_pid

	cd ..
}

benchmark persea
benchmark express
benchmark koa
