#!/usr/bin/env bash --posix

echo -n "Commit Message: "

read MESSAGE && git add --all

git commit --message "${MESSAGE}"
