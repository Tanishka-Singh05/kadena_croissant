# Exclusivity Status Feature

## Overview
The Exclusivity Status feature provides users with access to domain-specific exclusive Discord servers based on their DeFi, Gaming, and Development reputation scores. This feature integrates seamlessly with the existing Chainweb ZKRep visual language and component rhythms.

## Components

### NavPill
- **Location**: Right-side navbar cluster beside wallet/Disconnect elements
- **States**:
  - **Eligible** (≥1 domain): Crown icon + "Exclusive" + badge showing count
  - **Locked** (0 domains): Star icon + "Unlock Exclusive" + attention dot
- **Animations**: Hover effects, celebration animation on first eligibility

### ExclusivityModal
- **Trigger**: Clicking the navbar pill
- **Layout**: Centered modal with glass surface and gradient border
- **Content**: Three domain tiles (DeFi, Gaming, Dev) in equal-height grid
- **Features**: Copy all codes button, reputation tips link, ESC to close

### DomainTile
- **Structure**: Icon badge, current points, threshold, progress ring, status chip
- **States**:
  - **Eligible**: Success chip + invite code card
  - **Locked**: Neutral chip + deficit message
- **Animations**: Progress ring animation, hover tilt effects

### InviteCodeCard
- **Visibility**: Only shown for eligible domains
- **Features**: Static invite code display + copy button with ripple effect
- **Feedback**: Toast notification on successful copy

## Thresholds
- **DeFi**: ≥ 1000 points
- **Gaming**: ≥ 800 points  
- **Dev**: ≥ 900 points

## Invite Codes
- **DeFi**: DEFI-ELITE-1A2B
- **Gaming**: GAME-ELITE-3C4D
- **Dev**: DEV-ELITE-5E6F

## Styling
- Uses existing Chainweb ZKRep color palette and typography
- Desktop-only implementation (no mobile breakpoints)
- GPU-friendly animations (opacity, transform, filter)
- Consistent with existing card rhythms and spacing

## Integration
- Consumes reputation scores from existing ReputationContext
- No additional network calls required
- Maintains existing state management patterns
- Preserves accessibility features (keyboard navigation, focus management)
