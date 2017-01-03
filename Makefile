DOCKER_REGISTRY ?= devdocker.mulesoft.com:18078

IMAGE_NAME = api-platform/api-notebook
BUILD_IMAGE = $(IMAGE_NAME)-build:latest
PROD_IMAGE = $(IMAGE_NAME):$$(git describe)

SRC_VOLUME_PARAM = -v $$(pwd):/usr/src/app

#### BUILD the artifacts
.PHONY: build-artifacts
build-artifacts:
	docker build -f Dockerfile.build -t $(BUILD_IMAGE) .
	docker run --rm $(SRC_VOLUME_PARAM) $(BUILD_IMAGE) /usr/src/app/package-build.sh

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