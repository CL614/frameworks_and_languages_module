.PHONY: help
.DEFAULT_GOAL:=help
help:	## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-8s\033[0m %s\n", $$1, $$2 } END{print ""}' $(MAKEFILE_LIST)


DOCKER_IMAGE:=restapi

run: build  ## Run server in container
	docker run --rm -it --publish 8001:8001 ${DOCKER_IMAGE}
run_shell: build  ## Shell into 
	docker run --rm -it --publish 8001:8001 --volume ${PWD}:/app/:ro --entrypoint /bin/sh ${DOCKER_IMAGE}
build:
	docker build --tag ${DOCKER_IMAGE} .




