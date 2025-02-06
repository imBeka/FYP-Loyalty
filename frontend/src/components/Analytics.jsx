import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, LineChart, Line } from "recharts";
import moment from "moment";

const Analytics = () => {
  const { transactions } = useSelector((state) => state.transactions);

  const [typeData, setTypeData] = useState(null)
  const [pointsData, setPointsData] = useState(null)
  const [transactionTrend, setTransactionTrend] = useState(null)


  useEffect(() => {
    // Group transactions by type
    const transactionTypes = transactions.reduce((acc, tx) => {
        acc[tx.type] = (acc[tx.type] || 0) + 1;
        return acc;
    }, {});
    
    setTypeData( 
        Object.keys(transactionTypes).map((key) => ({
            name: key,
            count: transactionTypes[key],
        }))
    );

    // Points earned vs. redeemed
    const totalPointsEarned = transactions.reduce((acc, tx) => acc + (tx.pointsEarned || 0), 0);
    const totalPointsRedeemed = transactions.reduce((acc, tx) => acc + (tx.pointsRedeemed || 0), 0);
    setPointsData( [
        { name: "Points Earned", value: totalPointsEarned },
        { name: "Points Redeemed", value: totalPointsRedeemed },
    ]);

    // Transactions over time
    const dailyTransactions = transactions.reduce((acc, tx) => {
        const date = moment(tx.createdAt).format("YYYY-MM-DD");
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    setTransactionTrend(
        Object.keys(dailyTransactions).map((date) => ({
            date,
            count: dailyTransactions[date],
        }))
    );
  }, [transactions])

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Card title="Transactions by Type">
          <BarChart width={400} height={300} data={typeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#1890ff" />
          </BarChart>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Points Earned vs. Redeemed">
          <PieChart width={400} height={300}>
            <Pie data={pointsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label />
          </PieChart>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Transaction Trends Over Time">
          <LineChart width={800} height={300} data={transactionTrend}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#ff7300" />
          </LineChart>
        </Card>
      </Col>
    </Row>
  );
};

export default Analytics;
