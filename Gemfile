source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 4.1"

gem "jekyll-remote-theme"

# Ruby 3.1+ stopped implicitly exposing some stdlib/default gems that older
# Jekyll dependencies still expect to be loadable.
if Gem::Version.new(RUBY_VERSION) >= Gem::Version.new("3.1")
  gem "logger"
  gem "csv"
  gem "base64"
  gem "bigdecimal"
end

# Fixes `jekyll serve` in ruby 3
gem "webrick"

group :jekyll_plugins do
  gem "jekyll-default-layout"
  gem "jekyll-feed"
  gem "jekyll-optional-front-matter"
  gem "jekyll-paginate"
  gem "jekyll-readme-index"
  gem "jekyll-redirect-from"
  gem "jekyll-relative-links"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-titles-from-headings"
  gem "jekyll-include-cache"

  # Non-Github Pages plugins:
  gem "jekyll-compose"
end

gem 'wdm' if Gem.win_platform?
gem "tzinfo-data" if Gem.win_platform?
