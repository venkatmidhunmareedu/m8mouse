run:	
	pnpm dev

pre-build-linux:
	(cd external/m8m/build && cmake .. && make)
	sudo mkdir -p resources/linux/
	sudo mv external/m8m/build/m8mouse resources/linux/
	
pre-build-windows:
	(cd external/m8m/build && cmake .. -G "MinGW Makefiles" && mingw32-make)
	mkdir -p resources/windows/
	mv external/m8m/build/m8mouse.exe resources/windows/
	