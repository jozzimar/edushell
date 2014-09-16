CC = g++ -std=c++11
CFLAGS = -c -lcppcms -lcppdb
LDFLAGS = -lcppcms -lcppdb

all: edushell

edushell: central.o
	$(CC) central.o -o edushell $(LDFLAGS)
	
central.o: central.cpp
	$(CC) $(CFLAGS) central.cpp
	
clean:
	rm -rf *o edushell
