#!/bin/bash

# Cleanup Build Artifacts Script
# Removes development artifacts from project starter guide templates

set -e

echo "🧹 Cleaning build artifacts from templates..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to show size before and after
show_cleanup_stats() {
    local template_path="$1"
    local template_name="$2"

    echo -e "${YELLOW}📊 Cleanup stats for ${template_name}:${NC}"

    # Show before size
    if [ -d "$template_path/node_modules" ]; then
        local before_size=$(du -sh "$template_path/node_modules" 2>/dev/null | cut -f1)
        echo "  Before: $before_size (node_modules)"
    else
        echo "  Before: No node_modules found"
    fi

    # Clean artifacts
    echo "  Cleaning..."
    rm -rf "$template_path/node_modules"
    rm -rf "$template_path/.next"
    rm -rf "$template_path/.expo"
    rm -rf "$template_path/dist"
    rm -rf "$template_path/build"
    rm -rf "$template_path/.npm-cache"
    rm -rf "$template_path/.turbo"
    rm -rf "$template_path/.vercel"

    echo -e "  ${GREEN}✅ Cleaned${NC}"
}

# Get project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATES_DIR="$PROJECT_ROOT/templates"

echo "📁 Project root: $PROJECT_ROOT"
echo "📁 Templates directory: $TEMPLATES_DIR"

# Verify we're in the right place
if [ ! -d "$TEMPLATES_DIR" ]; then
    echo -e "${RED}❌ Templates directory not found at $TEMPLATES_DIR${NC}"
    echo "Please run this script from the project root or scripts directory"
    exit 1
fi

echo ""
echo "🎯 Templates found:"
for template in "$TEMPLATES_DIR"/*; do
    if [ -d "$template" ]; then
        template_name=$(basename "$template")
        echo "  - $template_name"
    fi
done

echo ""
echo "⚠️  This will remove ALL build artifacts and node_modules from templates"
echo "   Templates will need 'npm install' before use"
echo ""

# Prompt for confirmation
read -p "Continue with cleanup? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cleanup cancelled"
    exit 0
fi

echo ""
echo "🧹 Starting cleanup..."

# Clean each template
total_freed=0
for template in "$TEMPLATES_DIR"/*; do
    if [ -d "$template" ]; then
        template_name=$(basename "$template")
        echo ""
        show_cleanup_stats "$template" "$template_name"
    fi
done

echo ""
echo -e "${GREEN}✅ All templates cleaned successfully!${NC}"
echo ""
echo "📋 Next steps for each template:"
echo "  1. cd templates/[template-name]"
echo "  2. npm install"
echo "  3. npm run validate:all"
echo ""
echo "💡 Consider running this script:"
echo "  - Before git commits (prevent accidental artifact commits)"
echo "  - After development sessions"
echo "  - Before creating release tarballs"