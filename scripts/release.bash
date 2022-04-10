#!/usr/bin/env bash --posix

npx lerna-cli version --create-release "github" --no-private --conventional-commits --amend
