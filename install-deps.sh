#!/bin/bash
set -e
echo "Installing dependencies..."
cd "C:/Users/COORDINACION_TI/projects/siiges-ui"
yarn install --network-timeout 60000
echo "✓ Installation complete"
