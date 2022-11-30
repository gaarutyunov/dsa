.DEFAULT_GOAL := help

.PHONY: help
help: ## display help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

fmt: ## format all files
	@deno fmt

fmt-check: ## check format
	@deno fmt --check

lint: ## lint all files
	@deno lint

check: fmt-check lint ## check format and lint files

clean-cov: ## clean coverage reports
	@rm -rf cov_profile | true
	@rm -rf html_cov | true
	@rm cov_profile.lcov | true

ci: ## run tests
	@deno test --coverage=cov_profile --parallel
	@deno coverage --lcov --output=cov_profile.lcov cov_profile/

test: clean-cov ## test all with coverage
	@deno test --coverage=cov_profile --parallel
	@deno coverage --lcov --output=cov_profile.lcov cov_profile/
	@genhtml -o html_cov cov_profile.lcov

cov: ## display coverage in browser
	@open html_cov/index.html

test-cov: test cov ## run tests and display coverage

g: ## generate implementation (options: name - name of section to generate)
	@mkdir src/$(name)
	@touch src/$(name)/$(name).ts
	@touch src/$(name)/$(name)_test.ts

doc: ## generate documentation json
	@deno doc --json > doc.json
