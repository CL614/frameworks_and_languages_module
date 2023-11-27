DOCKER_IMAGE:=client

build:
	docker build --tag ${DOCKER_IMAGE} .

run:
	docker run --rm -it --publish 3003:3000 ${DOCKER_IMAGE}
