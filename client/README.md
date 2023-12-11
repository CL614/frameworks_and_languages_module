Client
======

This document describes the client side of Assignment 1. The document will demonstrate how to run the client both locally and within a container.
---------------------

### Running Client Locally

To run the client locally we enter the following code into the terminal. This exposes the client on port 8001 which is the default for the client side 

```python
cd client
python -m http.server 8001
```

To stop the client side enter Ctrl + C into the terminal 

### Running Client within a container

To run the client within a container we must call upon the make file we do this by entering the following code

```
make build && make run
```