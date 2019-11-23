.DEFAULT_GOAL:=help
SHELL:=/bin/bash

.PHONY: help install start build export test

help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

install:  ## Checks and installs dependencies
	$(info Checking and getting dependencies)
	@docker-compose run --rm app npm install

start: ## Starts the development server
	$(info Starting the development server)
	@docker-compose run --rm --service-ports app npm run dev

build: ## Bundles the app into static files for production
	$(info Bundling the app into static files for production)
	@docker-compose run --rm app npm run build

export: ## Bundles the app as a standalone static app
	$(info Bundling the app as a standalone static app)
	@docker-compose run --rm app npm run export

test: ## Starts the test runner
	$(info Running test)
	@docker-compose run --rm app npm run test
