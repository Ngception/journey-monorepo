#!/bin/bash
set -e
set -o pipefail
echo "## STARTING... ##"

# Add domains to etc hosts file.
echo "## Adding entries to etc hosts file... ##"
echo "\n# Journey monorepo domains
127.0.0.1 journey.dev
127.0.0.1 accounts.journey.dev" | sudo tee -a /etc/hosts

# Install mkcert with homebrew.
echo "## Installing mkcert with Homebrew... ##"
brew install mkcert

# Create SSL directory.
echo "## Creating ssl directory... ##"
mkdir ssl

# Generate certificate and key.
echo "## Creating ssl.crt and ssl.key... ##"
mkcert -cert-file ssl/ssl.crt -key-file ssl/ssl.key journey.dev "*.journey.dev"

# Add certificate to system and set to be trusted.
echo "## Adding ssl.crt to local system as trusted... ##"
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ssl/ssl.crt

echo "## DONE! ##"
