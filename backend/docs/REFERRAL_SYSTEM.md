# Referral System Backend Documentation

## Overview
The referral system allows users to earn free views by referring others. When someone signs up using a referral code and creates their first paid campaign, both the referrer and the referred user receive 500 free views each.

## Database Models

### 1. FreeViews Model (`models/FreeViews.js`)
Tracks free views balance for each user:
- `userId`: Reference to User
- `balance`: Current available free viewseve
- `totalEarned`: Total views ever earned
- `totalRedeemed`: Total views ever used
- `referralCode`: Unique referral code (e.g., "VID123456")
- `referredBy`: User who referred this user
- `referralApplied`: Whether user has applied a referral code

### 2. Referral Model (`models/Referral.js`)
Tracks referral relationships:
- `referrerId`: User who shared the referral code
- `referredId`: User who used the referral code
- `referralCode`: The code used
- `referrerViewsAwarded`: Views given to referrer (awarded when referred user creates first campaign)
- `referredViewsAwarded`: Views given to referred user (awarded immediately)
- `status`: pending → code_applied → campaign_created → completed

### 3. Updated User Model
Added `referralCode` field to store user's unique referral code.

## API Endpoints

### GET `/api/free-views/balance?email=user@example.com`
**Purpose**: Get user's free views balance and referral statistics

**Response**:
```json
{
  "balance": 1000,
  "totalReferrals": 5,
  "totalViewsEarned": 2500,
  "referralCode": "VID123456"
}
```

### POST `/api/free-views/apply-referral`
**Purpose**: Apply a referral code when user signs up

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "referralCode": "VID123456"
}
```

**Response**:
```json
{
  "message": "Referral code applied successfully!",
  "viewsEarned": 500,
  "newBalance": 500
}
```

**Flow**:
1. User enters referral code
2. System validates code and finds referrer
3. Referred user gets 500 views immediately
4. Referral record created with status "code_applied"
5. When referred user creates first paid campaign, referrer gets 500 views

## Business Logic Flow

### Scenario 1: User Signs Up with Referral Code
1. User visits: `yoursite.com/get-started?ref=VID123456`
2. User verifies email
3. Frontend calls `POST /api/free-views/apply-referral`
4. Backend:
   - Validates referral code
   - Creates FreeViews record for new user with 500 views
   - Creates Referral record (status: "code_applied")
   - Returns success

### Scenario 2: Referred User Creates First Campaign
1. User creates their first paid campaign
2. Order is created via `POST /api/orders/campaign`
3. Backend checks if this is user's first paid order
4. If yes:
   - Finds referral record for this user
   - Awards 500 views to referrer
   - Updates referral status to "campaign_created"

### Scenario 3: User Shares Their Referral Link
1. User goes to Free Views page
2. Frontend calls `GET /api/free-views/balance`
3. Backend returns user's referral code
4. User shares link: `yoursite.com/get-started?ref=VID123456`

## Integration Points

### Order Creation Integration
The referral award is automatically triggered in `order.controller.js`:
```javascript
// In createCampaignOrder function
awardReferrerOnFirstCampaign(user._id, order._id);
```

This function:
- Checks if user has a referral record
- Verifies this is their first paid campaign
- Awards referrer 500 views
- Updates referral status

## Helper Functions

### `generateReferralCode(email)`
Generates a unique referral code from user's email:
- Uses hash function to create consistent code
- Format: `VID` + 8 character alphanumeric code
- Example: `VIDA1B2C3D4`

### `addFreeViews(userId, views, source)`
Adds free views to user's balance (for other sources like mobile verification)

### `redeemFreeViews(userId, views)`
Deducts free views from balance when used

## Error Handling

- **Invalid referral code**: Returns 404
- **Self-referral**: Returns 400 (user can't use own code)
- **Already applied**: Returns 400 (one referral code per user)
- **User not found**: Returns 404

## Future Enhancements

1. **Tiered Rewards**: Different view amounts based on referral count
2. **Referral Analytics**: Track conversion rates, best referrers
3. **Bonus Campaigns**: Extra rewards for milestones (10 referrals, 50 referrals, etc.)
4. **Referral Dashboard**: Detailed stats for referrers


