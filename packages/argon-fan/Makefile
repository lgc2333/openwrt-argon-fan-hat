include $(TOPDIR)/rules.mk

PKG_NAME:=argon-fan
PKG_VERSION:=0.1.0
PKG_RELEASE:=2

PKG_MAINTAINER:=lgc2333
PKG_LICENSE:=MIT

include $(INCLUDE_DIR)/package.mk

define Package/argon-fan
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=Argon Fan HAT Control Service
  DEPENDS:=+i2c-tools +gpiod-tools
  PKGARCH:=all
endef

define Package/argon-fan/description
  A lightweight fan control daemon and hardware button monitor for the Argon Fan HAT on OpenWrt for Raspberry Pi.
endef

define Package/argon-fan/conffiles
/etc/config/argon_fan
endef

define Build/Compile
endef

define Package/argon-fan/install
$(CP) ./root/* $(1)/
endef

$(eval $(call BuildPackage,argon-fan))
