#!/bin/bash

for f in $(find ./lib/enterprise-edition -name '*.js' -or -name '*.d.ts' -or -name '*.css'); do
  cat ./.config/enterprise-license-header.txt $f > $f.new
  mv $f.new $f
  # ls $f
done