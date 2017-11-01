for /R ..\Scripts %%f in (*.js) do copy %%f .\src
./node_modules/.bin/esdoc