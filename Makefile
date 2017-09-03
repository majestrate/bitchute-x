DIST = dist/bitchute-x.user.js
DEV = dist/bitchute-x-bleeding-edge.user.js
BUILD = build/bitchute-x.user.js

all: clean build

build:
	yarn install
	yarn run build
	cp $(BUILD) $(DEV)

dist: build
	cp $(BUILD) $(DIST)

clean:
	rm -fr build
