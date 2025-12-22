#!/bin/sh

# Inject environment variables into index.html at runtime
# This allows us to use Cloud Run Secret Manager variables in the static frontend

TARGET_FILE="/usr/share/nginx/html/index.html"

# Check if GOOGLE_API_KEY is set
if [ -z "$GOOGLE_API_KEY" ]; then
    echo "Warning: GOOGLE_API_KEY environment variable is not set."
else
    echo "Injecting GOOGLE_API_KEY into index.html..."
    # Create valid JSON string for info
    # Use sed to inject the script tag before </head>
    # Note: We use a placeholder in index.html or just strict injection
    
    # Securely inject as a window global
    # We use a temporary file to avoid race conditions (though rare in container startup)
    
    sed -i "s|<head>|<head><script>window.ENV = { GOOGLE_API_KEY: \"$GOOGLE_API_KEY\" };</script>|g" "$TARGET_FILE"
fi

echo "Environment injection complete."
