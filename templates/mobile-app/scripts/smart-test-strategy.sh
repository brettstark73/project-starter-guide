#!/bin/bash
# Smart Test Strategy - Mobile App Template
set -e

echo "🧠 Analyzing changes for optimal test strategy..."

# Collect metrics
CHANGED_FILES=$(git diff --name-only HEAD~1..HEAD 2>/dev/null | wc -l | tr -d ' ')
CHANGED_LINES=$(git diff --stat HEAD~1..HEAD 2>/dev/null | tail -1 | grep -o '[0-9]* insertions' | grep -o '[0-9]*' || echo "0")
CURRENT_BRANCH=$(git branch --show-current)
HOUR=$(date +%H)
DAY_OF_WEEK=$(date +%u)

# Project-specific high-risk patterns (mobile app)
HIGH_RISK_FILES=$(git diff --name-only HEAD~1..HEAD 2>/dev/null | grep -E "(src/navigation|src/screens|src/services|src/api)" || true)
COMPONENT_FILES=$(git diff --name-only HEAD~1..HEAD 2>/dev/null | grep -E "src/(components|screens)" || true)
CONFIG_FILES=$(git diff --name-only HEAD~1..HEAD 2>/dev/null | grep -E "(package\.json|app\.json|\.env|config)" || true)

# Calculate risk score (0-10)
RISK_SCORE=0

# File-based risk
[[ -n "$HIGH_RISK_FILES" ]] && RISK_SCORE=$((RISK_SCORE + 4))
[[ -n "$COMPONENT_FILES" ]] && RISK_SCORE=$((RISK_SCORE + 2))
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
  echo "   • All tests + lint + typecheck"
  npm run lint && npm run typecheck && npm test
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
echo "💡 Tip: Run 'npm run lint && npm test && npm run typecheck' locally for full validation"
