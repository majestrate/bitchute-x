OUT = dist/bitchute-x.user.js

all: clean build

build:
	yarn install
	yarn run build

dist: build
	mkdir -p dist
	cp build/bitchute-x.user.js $(OUT)

clean:
	rm -fr build
