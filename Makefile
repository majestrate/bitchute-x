OUT = bitchute-x.user.js

all: clean build

build:
	yarn run build

$(OUT): build
	cp build/bitchute-x.user.js $(OUT)

clean:
	rm -f build
