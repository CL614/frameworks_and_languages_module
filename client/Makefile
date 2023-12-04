DOCKER_IMAGE= vue

build:
	docker build -t $(DOCKER_IMAGE) .
run:
	docker run --rm -it --publish 8001:8001 ${DOCKER_IMAGE}

