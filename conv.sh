#!/bin/bash

source_folder="./images"
target_folder="./converted"


for file in "$source_folder"/*; do
    cwebp -q 80 -o "${target_folder}/${file##*/}.webp" "$file"
done
