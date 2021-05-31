#!/bin/bash

imageTextArray=(
    'redis'
    'none'
    'mongo'
)

#stop running containers
running_container_count=$(docker ps -q | grep -c .)
if [ $running_container_count != 0 ]; then
    echo "found running countainers"
    docker stop -t 0 $(docker ps -q)
fi

#prune all stopped containers
stopped_container_count=$(docker ps -aq | grep -c .)
if [ $stopped_container_count != 0 ]; then
    echo "found stopped countainers"
    docker container prune -f
fi

#delete specific images, based on names listed in the array $imageTextArray
for imageText in ${imageTextArray[@]}; do
    echo "looking for image ids matching --> $imageText"
    image_exists=$(docker images | awk -v findText=$imageText '{if(match($1,findText))print $3}')
    
    if [ -n "$image_exists" ]; then 
        echo "matching image id found=$image_exists"
        docker rmi $image_exists
    fi 
done

