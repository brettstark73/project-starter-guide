#!/bin/bash
# Smart Test Strategy - SaaS Level 1 Template
set -e

echo "🧠 Analyzing changes for optimal test strategy..."

# Collect metrics
CHANGED_FILES=$(git diff --name-only HEAD~1..HEAD 2>/dev/null | wc -l | tr -d ' ')
CHANGED_LINES=$(git diff --stat HEAD~1..HEAD 2>/dev/null | tail -1 | grep -o '[0-9]* insertions' | grep -o '[0-9]*' || echo "0")
CURRENT_BRANCH=$(git branch --show-current)
HOUR=$(date +%H)
DAY_OF_WEEK=$(date +%u)

# Project-specific high-risk patterns (SaaS app with auth/payment)
HIGH_RISK_FILES=$(git diff --name-only HEAD~1..HEAD 2>/dev/null | grep -E "(auth|payment|billing|subscription|stripe|prisma/schema|api/)" || true)
API_FILES=$(git diff --name-only HEAD~1..HEAD 2>/dev/null | grep -E "api/" || true)
CONFIG_FILES=$(git diff --name-only HEAD~1..HEAD 2>/dev/null | grep -E "(package\.json|\.env|config)" || true)

# Calculate risk score (0-10)
RISK_SCORE=0

# File-based risk
[[ -n "$HIGH_RISK_FILES" ]] && RISK_SCORE=$((RISK_SCORE + 4))
[[ -n "$API_FILES" ]] && RISK_SCORE=$((RISK_SCORE + 2))
[[ -n "$CONFIG_FILES" ]] && RISK_SCORE=$((RISK_SCORE + 2))

# Size-based risk
[[ $CHANGED_FILES -gt 10 ]] && RISK_SCORE=$((RISK_SCORE + 2))
[[ $CHANGED_FILES -gt 20 ]] && RISK_SCORE=$((RISK_SCORE + 3))
[[ $CHANGED_LINES -gt 200 ]] && RISK_SCORE=$((RISK_SCORE + 2))

# Branch-based risk
case $CURRENT_BRANCH in
  main|master|production) RISK_SCORE=$((RISK_SCORE + 3)) ;;
  hotfix/*) RISK_SCORE=$((RISK_SCORE + 4)) ;;
  release/*) RISK_SCORE=$((RISK_SCORE + 2)) ;;
  develop) RISK_SCORE=$((RISK_SCORE + 1)) ;;
esac

# Time pressure adjustment (strip leading zeros)
HOUR_NUM=$((10#$HOUR))
if [[ $HOUR_NUM -ge 9 && $HOUR_NUM -le 17 && $DAY_OF_WEEK -le 5 ]]; then
  SPEED_BONUS=true
else
  SPEED_BONUS=false
fi

# Display analysis
echo "📊 Analysis Results:"
echo "   📁 Files: $CHANGED_FILES"
echo "   📏 Lines: $CHANGED_LINES"
echo "   🌿 Branch: $CURRENT_BRANCH"
echo "   🎯 Risk Score: $RISK_SCORE/10"
echo "   ⚡ Speed Bonus: $SPEED_BONUS"
echo ""

# Decision logic
if [[ $RISK_SCORE -ge 7 ]]; then
  echo "🔴 HIGH RISK - Comprehensive validation"
  echo "   • All tests + security audit"
  npm run lint && npm test && npm run security:audit
elif [[ $RISK_SCORE -ge 4 ]]; then
  echo "🟡 MEDIUM RISK - Standard validation"
  echo "   • Lint + tests"
  npm run lint && npm test
elif [[ $RISK_SCORE -ge 2 || "$SPEED_BONUS" == "false" ]]; then
  echo "🟢 LOW RISK - Fast validation"
  echo "   • Lint only"
  npm run lint
else
  echo "⚪ MINIMAL RISK - Quality checks only"
  echo "   • Basic validation"
  echo "   ✅ Changes validated"
fi

echo ""
echo "💡 Tip: Run 'npm test && npm run security:audit' locally for full validation"
