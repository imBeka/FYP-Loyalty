import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Card, Row, Col } from "antd";


const Statistics = () => {
  const { transactions } = useSelector((state) => state.transactions);

  // Data for the bar chart (total points earned and redeemed per user)
  const getUserPointsData = () => {
    const userPointsMap = {};

    transactions.forEach((transaction) => {
      const { userEmail, pointsEarned, pointsRedeemed } = transaction;

      if (!userPointsMap[userEmail]) {
        userPointsMap[userEmail] = {
          userEmail,
          pointsEarned: 0,
          pointsRedeemed: 0,
        };
      }

      userPointsMap[userEmail].pointsEarned += pointsEarned || 0;
      userPointsMap[userEmail].pointsRedeemed += pointsRedeemed || 0;
    });

    return Object.values(userPointsMap);
  };

  // Data for the pie chart (total points earned vs redeemed)
  const getPointsDistributionData = () => {
    let totalPointsEarned = 0;
    let totalPointsRedeemed = 0;

    transactions.forEach((transaction) => {
      totalPointsEarned += transaction.pointsEarned || 0;
      totalPointsRedeemed += transaction.pointsRedeemed || 0;
    });

    return [
      { name: "Points Earned", value: totalPointsEarned },
      { name: "Points Redeemed", value: totalPointsRedeemed },
    ];
  };

  // Data for the bar chart (total amount spent per user)
  const getUserSpendingData = () => {
    const userSpendingMap = {};

    transactions.forEach((transaction) => {
      const { userEmail, amount } = transaction;

      if (amount && amount > 0) {
        if (!userSpendingMap[userEmail]) {
          userSpendingMap[userEmail] = {
            userEmail,
            amount: 0,
          };
        }

        userSpendingMap[userEmail].amount += amount;
      }
    });

    return Object.values(userSpendingMap);
  };

  const userPointsData = getUserPointsData();
  const pointsDistributionData = getPointsDistributionData();
  const userSpendingData = getUserSpendingData();

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Colors for pie chart

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Bar Chart: Points Earned vs Redeemed per User */}
        <Col xs={24} md={12}>
          <Card title="Points Earned vs Redeemed per User">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userPointsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="userEmail" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pointsEarned" fill="#8884d8" name="Points Earned" />
                <Bar dataKey="pointsRedeemed" fill="#82ca9d" name="Points Redeemed" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Pie Chart: Points Distribution (Earned vs Redeemed) */}
        <Col xs={24} md={12}>
          <Card title="Points Distribution (Earned vs Redeemed)">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pointsDistributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pointsDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Bar Chart: Total Amount Spent per User */}
        <Col xs={24}>
          <Card title="Total Amount Spent per User">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userSpendingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="userEmail" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#FF8042" name="Amount Spent" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;