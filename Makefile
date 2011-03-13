APPID = org.webosinternals.hello

package: clean
	cd c-service && ${MAKE}
ifdef DEVICE
	cd c-plugin && ${MAKE}
endif
	palm-package . package node-service
	ar q ${APPID}_*.ipk pmPostInstall.script
	ar q ${APPID}_*.ipk pmPreRemove.script

test: package
	- palm-install -r ${APPID}
	palm-install ${APPID}_*.ipk
	palm-launch ${APPID}

clean:
	find . -name '*~' -delete
	rm -f ipkgtmp*.tar.gz ${APPID}_*.ipk

clobber: clean
	cd c-service && ${MAKE} clobber
	cd c-plugin && ${MAKE} clobber
