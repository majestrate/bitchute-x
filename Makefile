OUT = dist/bitchute-x.user.js

all: clean $(OUT)

build:
	yarn install
	yarn run build

$(OUT): build
	mkdir -p dist
	cp build/bitchute-x.user.js $(OUT)

clean:
	rm -fr build
