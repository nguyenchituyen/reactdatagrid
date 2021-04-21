#!/bin/bash

for f in $(find ./lib/community-edition -name '*.js' -or -name '*.d.ts' -or -name '*.css'); do
  cat ./.config/community-license-header.txt $f > $f.new
  mv $f.new $f
  # ls $f
done