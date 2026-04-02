#!/bin/sh
. $(dirname "$0")/_utils.sh
cd build || exit 1

for pkg in $BUILD_PACKAGES; do
	echo "==> Building $pkg"
	if [ "$1" -eq "clean" ]; then
		make package/$pkg/clean -j$(nproc) BUILD_LOG=1
	fi
	make package/$pkg/compile -j$(nproc) BUILD_LOG=1
done

cd .. || exit 1
if [ ! -d dist ]; then
	ln -s build/bin/packages/*/* dist
fi
