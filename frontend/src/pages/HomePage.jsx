import { Card, Typography, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllRewards
} from "../features/reward/rewardSlice";
import { useEffect } from "react";
import { getUserProfile } from "../features/auth/authSlice";

const { Title, Text } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { rewards } = useSelector((state) => state.reward);

  useEffect(() => {
      dispatch(getUserProfile())
      dispatch(fetchAllRewards());
  }, [dispatch])

  // Redirect to login if user is not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div style={{ padding: "16px" }}>
      {/* User's Points */}
      <h1>Welcome, { user && user.name }</h1>
      <Card
        style={{
          marginBottom: "24px",
          textAlign: "center",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={4} style={{ marginBottom: "0" }}>
          Your Points
        </Title>
        <Text style={{ fontSize: "32px", fontWeight: "bold", color: "#1890ff" }}>
          {user.points} Points
        </Text>
      </Card>

      {/* Available Rewards */}
      <Title level={4} style={{ marginBottom: "16px" }}>
        Available Rewards
      </Title>
      <Row gutter={[16, 16]}>
        {rewards
          .filter((reward) => reward.isActive) // Only show active rewards
          .map((reward) => (
            <Col key={reward._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Title level={5} style={{ marginBottom: "8px" }}>
                  {reward.name}
                </Title>
                <Text style={{ color: "#666", marginBottom: "8px", display: "block" }}>
                  {reward.description}
                </Text>
                {/* <Text strong style={{ color: "#52c41a" }}>
                  {reward.pointsRequired} Points Required
                </Text> */}
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default HomePage;