#!/usr/bin/env bash --posix

echo -n "Pre-Version Git Commit Message: "

read MESSAGE && git add --all

git commit --message "${MESSAGE}"
