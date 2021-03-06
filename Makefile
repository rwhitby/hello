APPID = org.webosinternals.hello

emulator:
	cd c-service && ${MAKE}
	cd c-plugin && ${MAKE}

device:
	cd c-service && ${MAKE} DEVICE=1
	cd c-plugin && ${MAKE} DEVICE=1

package: clean emulator
	palm-package . package node-service
	ar q ${APPID}_*.ipk pmPostInstall.script
	ar q ${APPID}_*.ipk pmPreRemove.script

test: package
	- palm-install -r ${APPID}
	palm-install ${APPID}_*.ipk
	palm-launch ${APPID}

test-veer: package
	- palm-install -d broadway-linux -r ${APPID}
	palm-install -d broadway-linux ${APPID}_*.ipk
	palm-launch -d broadway-linux ${APPID}

test-touchpad: package
	- palm-install -d topaz-linux -r ${APPID}
	palm-install -d topaz-linux ${APPID}_*.ipk
	palm-launch -d topaz-linux ${APPID}

clean:
	find . -name '*~' -delete
	rm -f ipkgtmp*.tar.gz ${APPID}_*.ipk

clobber: clean
	cd c-service && ${MAKE} clobber
	cd c-plugin && ${MAKE} clobber
