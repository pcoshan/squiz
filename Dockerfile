FROM arm64v8/ubuntu

RUN apt-get update && apt-get install -y \
    wget

# RUN perf
# Copy the app across
WORKDIR /app
# Might need link 
# ln -s /usr/lib/linux-tools/3.13.0-141-generic/perf /usr/bin/perfxs