DIST = dist/bitchute-x.user.js
DEV = build/bitchute-x-$(shell date +%Y%m%d%H%M%S).user.js
BUILD = build/bitchute-x.user.js

all: dev

dev: clean
	yarn install
	yarn run dev
	cp $(BUILD) $(DEV)

dist: clean
	yarn install
	yarn run build
	cp $(BUILD) $(DIST)

upload: build
	scp build/*.user.js root@i2p.rocks:/var/www/html/files/bitchute-x/

clean:
	rm -fr build
