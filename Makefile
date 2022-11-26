.DEFAULT_GOAL := help

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

fmt: ## format all files
	@deno fmt

lint: ## lint all files
	@deno lint

test: ## test all with coverage
	@deno test --coverage=cov_profile --parallel
	@deno coverage --lcov --output=cov_profile.lcov cov_profile/
	@genhtml -o html_cov cov_profile.lcov

cov: ## display coverage in browser
	@open html_cov/index.html

g: ## generate implementation
	@mkdir src/$(name)
	@touch src/$(name)/$(name).ts
	@touch src/$(name)/$(name)_test.ts
