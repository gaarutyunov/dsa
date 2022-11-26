fmt:
	@deno fmt

lint:
	@deno lint

test:
	@deno test --coverage=cov_profile
	@deno coverage --lcov --output=cov_profile.lcov cov_profile/
	@genhtml -o html_cov cov_profile.lcov