DOCKER_REGISTRY ?= devdocker.mulesoft.com:18078

IMAGE_NAME = api-platform/api-notebook
BUILD_IMAGE = $(IMAGE_NAME)-build:latest
PROD_IMAGE = $(IMAGE_NAME):$$(git describe)

SRC_VOLUME_PARAM = -v $$(pwd):/usr/src/app

ENV_VARS_TO_INJECT = -e NODE_ENV -e NODE_CONFIG_PERSIST_ON_CHANGE -e URL -e TITLE -e EMBED_SCRIPT -e GITHUB_CLIENT_ID -e GITHUB_CLIENT_SECRET

#### BUILD the artifacts
.PHONY: build-artifacts
build-artifacts:
	docker build -f Dockerfile.build -t $(BUILD_IMAGE) .
	docker run $(ENV_VARS_TO_INJECT) --rm $(SRC_VOLUME_PARAM) $(BUILD_IMAGE) /usr/src/app/package-build.sh

#### BUILD DOCKER IMAGE with the generated artifacts
.PHONY: build-image
build-image:
	rm -rf ./artifacts && mkdir -p ./artifacts
	tar -xzvf ./output/api-notebook.tar.gz -C ./artifacts
	docker build -f Dockerfile.runtime -t $(PROD_IMAGE) .

#### PUSH DOCKER IMAGE
.PHONY: push-image
push-image:
	docker tag $(PROD_IMAGE) $(DOCKER_REGISTRY)/$(PROD_IMAGE)
	docker push $(DOCKER_REGISTRY)/$(PROD_IMAGE)