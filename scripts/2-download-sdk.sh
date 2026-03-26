#!/bin/sh
if [ -d build ]; then
	read -p "Build dir already exists, should I delete? [y/N] " -r answer
	if [ "$answer" != "y" ] && [ "$answer" != "Y" ]; then
		echo "Aborting"
		exit 1
	fi

	echo "==> Deleting build dir"
	rm -rf build
fi

echo "==> Downloading SDK"
mkdir build

wget -O build/openwrt-sdk.tar.zst \
	https://archive.openwrt.org/releases/24.10.0/targets/x86/64/openwrt-sdk-24.10.0-x86-64_gcc-13.3.0_musl.Linux-x86_64.tar.zst
# Pi 4B & OpenWrt 24.10.3
# 	https://downloads.openwrt.org/releases/24.10.3/targets/bcm27xx/bcm2711/openwrt-sdk-24.10.3-bcm27xx-bcm2711_gcc-13.3.0_musl.Linux-x86_64.tar.zst

echo "==> Unpacking SDK"
tar -xf build/openwrt-sdk.tar.zst -C build --strip-components=1
rm -f build/openwrt-sdk.tar.zst
