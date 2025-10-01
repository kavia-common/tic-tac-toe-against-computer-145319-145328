#!/bin/bash
cd /home/kavia/workspace/code-generation/tic-tac-toe-against-computer-145319-145328/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

