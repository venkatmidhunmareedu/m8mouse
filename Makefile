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
	

# sudo chown root:root /home/midhun/Desktop/m8mouse/node_modules/.pnpm/electron@39.6.1/node_modules/electron/dist/chrome-sandbox
# sudo chmod 4755 /home/midhun/Desktop/m8mouse/node_modules/.pnpm/electron@39.6.1/node_modules/electron/dist/chrome-sandbox