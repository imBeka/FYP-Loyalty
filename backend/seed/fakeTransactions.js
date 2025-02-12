const transactions = [
    {
      userId: "678166a017d1ec21892b1039", // Bex Doe
      userEmail: "bex@mail.com",
      userName: "Bex Doe",
      type: "purchase",
      amount: 100, // 100 / 2 = 50 points earned
      pointsEarned: 50,
      pointsRedeemed: 0,
      description: "Purchased coffee and snacks",
      createdAt: "2025-01-15T10:00:00.000Z",
    },
    {
      userId: "67829332d56cefdbf0c96d07", // Bekzod Yuldashev
      userEmail: "bka05yu@gmail.com",
      userName: "Bekzod Yuldashev",
      type: "purchase",
      amount: 200, // 200 / 2 = 100 points earned
      pointsEarned: 100,
      pointsRedeemed: 0,
      description: "Monthly grocery shopping",
      createdAt: "2025-01-16T14:30:00.000Z",
    },
    {
      userId: "678fbdfa9338356fd09b9a0a", // John Doe
      userEmail: "another.user@mail.com",
      userName: "John Doe",
      type: "purchase",
      amount: 60, // 60 / 2 = 30 points earned
      pointsEarned: 30,
      pointsRedeemed: 0,
      description: "Bought a latte",
      createdAt: "2025-01-17T09:15:00.000Z",
    },
    {
      userId: "67829332d56cefdbf0c96d07", // Bekzod Yuldashev
      userEmail: "bka05yu@gmail.com",
      userName: "Bekzod Yuldashev",
      type: "redemption",
      pointsEarned: 0,
      pointsRedeemed: 70, // Redeemed "Coffee for 70 points"
      rewardId: "6786aaeb1b8013fe8e88c6f3", // Coffee for 70 points
      description: "Redeemed free coffee",
      createdAt: "2025-01-18T12:00:00.000Z",
    },
    {
      userId: "678166a017d1ec21892b1039", // Bex Doe
      userEmail: "bex@mail.com",
      userName: "Bex Doe",
      type: "purchase",
      amount: 80, // 80 / 2 = 40 points earned
      pointsEarned: 40,
      pointsRedeemed: 0,
      description: "Bought lunch",
      createdAt: "2025-01-19T13:45:00.000Z",
    },
    {
      userId: "678fbdfa9338356fd09b9a0a", // John Doe
      userEmail: "another.user@mail.com",
      userName: "John Doe",
      type: "redemption",
      pointsEarned: 0,
      pointsRedeemed: 30, // Redeemed "Free Latte" (only 30 points available)
      rewardId: "6786ab931b8013fe8e88c6f9", // Free Latte (120 points required, but only 30 available)
      description: "Partial redemption for free latte",
      createdAt: "2025-01-20T16:20:00.000Z",
    },
    {
      userId: "6797c0448be91f65b45f3a13", // Abdulla
      userEmail: "abdulla@gmail.com",
      userName: "Abdulla",
      type: "purchase",
      amount: 120, // 120 / 2 = 60 points earned
      pointsEarned: 60,
      pointsRedeemed: 0,
      description: "Bought snacks",
      createdAt: "2025-01-21T11:10:00.000Z",
    },
    {
      userId: "679e7c7454967066509a23f4", // Alisher Navoi
      userEmail: "navoi@mail.uz",
      userName: "Alisher Navoi",
      type: "purchase",
      amount: 40, // 40 / 2 = 20 points earned
      pointsEarned: 20,
      pointsRedeemed: 0,
      description: "Purchased tea",
      createdAt: "2025-01-22T08:30:00.000Z",
    },
    {
      userId: "679e7df685a751388317785a", // Max Usmanov
      userEmail: "usmanov@mail.uz",
      userName: "Max Usmanov",
      type: "purchase",
      amount: 180, // 180 / 2 = 90 points earned
      pointsEarned: 90,
      pointsRedeemed: 0,
      description: "Bought dinner",
      createdAt: "2025-01-23T19:00:00.000Z",
    },
    // {
    //   userId: "67829332d56cefdbf0c96d07", // Bekzod Yuldashev
    //   userEmail: "bka05yu@gmail.com",
    //   userName: "Bekzod Yuldashev",
    //   type: "redemption",
    //   pointsEarned: 0,
    //   pointsRedeemed: 100, // Redeemed "Meal Deal for 200 Points" (only 100 points available)
    //   rewardId: "679e84c11453a302434ccd83", // Meal Deal for 200 Points
    //   description: "Partial redemption for meal deal",
    //   createdAt: "2025-01-24T14:15:00.000Z",
    // },
    {
      userId: "678166a017d1ec21892b1039", // Bex Doe
      userEmail: "bex@mail.com",
      userName: "Bex Doe",
      type: "purchase",
      amount: 140, // 140 / 2 = 70 points earned
      pointsEarned: 70,
      pointsRedeemed: 0,
      description: "Bought coffee and pastries",
      createdAt: "2025-01-25T10:45:00.000Z",
    },
    {
      userId: "678fbdfa9338356fd09b9a0a", // John Doe
      userEmail: "another.user@mail.com",
      userName: "John Doe",
      type: "purchase",
      amount: 100, // 100 / 2 = 50 points earned
      pointsEarned: 50,
      pointsRedeemed: 0,
      description: "Purchased snacks",
      createdAt: "2025-01-26T12:30:00.000Z",
    },
    {
      userId: "6797c0448be91f65b45f3a13", // Abdulla
      userEmail: "abdulla@gmail.com",
      userName: "Abdulla",
      type: "redemption",
      pointsEarned: 0,
      pointsRedeemed: 60, // Redeemed "Coffee for 70 points" (only 60 points available)
      rewardId: "6786aaeb1b8013fe8e88c6f3", // Coffee for 70 points
      description: "Partial redemption for free coffee",
      createdAt: "2025-01-27T09:00:00.000Z",
    },
    {
      userId: "679e7c7454967066509a23f4", // Alisher Navoi
      userEmail: "navoi@mail.uz",
      userName: "Alisher Navoi",
      type: "purchase",
      amount: 60, // 60 / 2 = 30 points earned
      pointsEarned: 30,
      pointsRedeemed: 0,
      description: "Bought tea",
      createdAt: "2025-01-28T08:15:00.000Z",
    },
    {
      userId: "679e7df685a751388317785a", // Max Usmanov
      userEmail: "usmanov@mail.uz",
      userName: "Max Usmanov",
      type: "redemption",
      pointsEarned: 0,
      pointsRedeemed: 90, // Redeemed "Free Latte" (90 points available)
      rewardId: "6786ab931b8013fe8e88c6f9", // Free Latte (120 points required, but only 90 available)
      description: "Partial redemption for free latte",
      createdAt: "2025-01-29T16:45:00.000Z",
    },
  ];
export default transactions;