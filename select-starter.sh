#!/bin/bash

# Color definitions
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to list available starters
list_starters() {
    echo -e "${BLUE}Available starters:${NC}"
    local i=1
    for starter in */; do
        echo -e "${GREEN}$i)${NC} ${starter%/}"
        ((i++))
    done
}

# Main script
echo -e "${BLUE}Welcome to the ${NC}next-starter ${BLUE}selector ${GREEN}@plvo${NC}"
list_starters

while true; do
    echo -e "\n${BLUE}Select a starter (enter the number or 'q' to quit):${NC}"
    read choice

    if [[ $choice == 'q' ]]; then
        echo -e "${BLUE}Exiting. Goodbye!${NC}"
        exit 0
    fi

    starter=$(ls -d */ | sed -n "${choice}p")

    if [ -n "$starter" ]; then
        echo -e "${GREEN}You selected: ${starter%/}${NC}"
        read -p "Enter the destination path: " dest

        if [ -e "$dest" ]; then
            echo -e "${RED}Error: Destination already exists. Please choose a different path.${NC}"
        else
            cp -R "$starter" "$dest"
            echo -e "${GREEN}Starter successfully copied to $dest${NC}"
            break
        fi
    else
        echo -e "${RED}Invalid selection. Please try again.${NC}"
        list_starters
    fi
done
