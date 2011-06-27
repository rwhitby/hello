VERSION=unknown

ifdef DEVICE
# Device build
STAGING_DIR=/srv/preware/build/staging/armv7
ifeq ($(shell uname -s),Darwin)
CC=/opt/PalmPDK/arm-gcc/bin/arm-none-linux-gnueabi-gcc
INCDIRS=-I/opt/PalmPDK/include -I/opt/PalmPDK/include/SDL
LIBDIR=/opt/PalmPDK/device/lib
else
CC=/srv/preware/build/toolchain/cs07q3armel/build/arm-2007q3/bin/arm-none-linux-gnueabi-gcc
INCDIRS=-I${STAGING_DIR}/usr/include
endif
else
# Emulator build
STAGING_DIR=/srv/preware/build/staging/i686
ifeq ($(shell uname -s),Darwin)
CC=/opt/PalmPDK/i686-gcc/bin/i686-nptl-linux-gnu-gcc --sysroot=/opt/PalmPDK/i686-gcc/sys-root
INCDIRS=-I/opt/PalmPDK/include -I/opt/PalmPDK/include/SDL
LIBDIR=/opt/PalmPDK/emulator/lib
else
CC=/srv/preware/build/toolchain/i686-unknown-linux-gnu/build/i686-unknown-linux-gnu/bin/i686-unknown-linux-gnu-gcc
INCDIRS=-I${STAGING_DIR}/usr/include
endif
endif

CPPFLAGS := -g -DVERSION=\"${VERSION}\" ${INCDIRS}
LDFLAGS  := -g -L${LIBDIR} -Wl,-rpath-link,${LIBDIR} -lSDL -lpdl -Wl,--allow-shlib-undefined

hello: hello.o

install: hello
	- novacom run file://usr/bin/killall -- org.webosinternals.hello.plugin
	- novacom run file://bin/mkdir -- -p /var/usr/sbin
	novacom put file://var/usr/sbin/org.webosinternals.hello.plugin < hello

clobber:
	rm -rf *.o hello
