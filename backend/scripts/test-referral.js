const axios = require("axios");

const BASE_URL = process.env.BACKEND_URL || "http://localhost:5000";

async function run(referrerEmail, referredEmail) {
  try {
    console.log("Using backend:", BASE_URL);
    console.log("Referrer:", referrerEmail);
    console.log("Referred :", referredEmail);

    // 1) Get referrer balance and referral code
    const bal1 = await axios.get(
      `${BASE_URL}/api/free-views/balance`,
      { params: { email: referrerEmail } }
    );
    const refCode = bal1.data.referralCode;
    console.log("\nReferrer balance before:", bal1.data);
    console.log("Referrer code:", refCode);

    // 2) Apply referral for referred user
    const apply = await axios.post(
      `${BASE_URL}/api/free-views/apply-referral`,
      { email: referredEmail, referralCode: refCode }
    );
    console.log("\nApply referral response:", apply.data);

    // 3) Get balances after
    const balRef = await axios.get(
      `${BASE_URL}/api/free-views/balance`,
      { params: { email: referrerEmail } }
    );
    const balReferred = await axios.get(
      `${BASE_URL}/api/free-views/balance`,
      { params: { email: referredEmail } }
    );
    console.log("\nReferrer balance after:", balRef.data);
    console.log("Referred balance after:", balReferred.data);
  } catch (err) {
    if (err.response) {
      console.error("HTTP Error:", err.response.status, err.response.data);
    } else {
      console.error("Error:", err.message);
    }
  }
}

// Run with: node scripts/test-referral.js referrerEmail referredEmail
if (require.main === module) {
  const [referrerEmail, referredEmail] = process.argv.slice(2);
  if (!referrerEmail || !referredEmail) {
    console.error("Usage: node scripts/test-referral.js <referrerEmail> <referredEmail>");
    process.exit(1);
  }
  run(referrerEmail, referredEmail);
}

