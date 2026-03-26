#!/bin/sh
sudo apt update -y
sudo apt install -y shellcheck
go install mvdan.cc/sh/v3/cmd/shfmt@latest
