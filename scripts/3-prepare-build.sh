#!/bin/sh
. $(dirname "$0")/_utils.sh
cd build || exit 1

echo "==> Linking workspace to SDK package directory"
PKG_DIR=package/openwrt-build
rm -f $PKG_DIR || exit 1
ln -s ../../packages $PKG_DIR

echo "==> Updating feeds"
./scripts/feeds update -a

echo "==> Installing feeds"
for f in $FEEDS; do
	echo "  ==> Installing $f"
	./scripts/feeds install -d n $f
done

echo "==> Generating config"
echo "CONFIG_ALL_NONSHARED=n" >.config
echo "CONFIG_ALL_KMODS=n" >>.config
echo "CONFIG_ALL=n" >>.config
echo "CONFIG_AUTOREMOVE=y" >>.config
echo "CONFIG_TARGET_MULTI_PROFILE=n" >>.config
echo "CONFIG_TARGET_ALL_PROFILES=n" >>.config
echo "CONFIG_BUILD_LOG=y" >>.config
for loc in $LUCI_LOCALES; do
	echo "CONFIG_LUCI_LANG_$loc=y" >>.config
done
for pkg in $PACKAGES; do
	echo "CONFIG_PACKAGE_$pkg=m" >>.config
done
make defconfig
