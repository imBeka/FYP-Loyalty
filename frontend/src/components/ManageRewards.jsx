import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message, Row, Col, Card } from "antd";
import { PlusOutlined, EditOutlined, GiftOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRewards,
  createNewReward,
  updateReward,
  deleteReward,
} from "../features/reward/rewardSlice";
import { createTransactionRedeem, reset as resetTransaction } from "../features/transaction/transactionSlice";
import Spinner from "./Spinner";

const ManageRewards = () => {
  const dispatch = useDispatch();
  const {
    rewards,
    isLoading,
    isError,
    message: rewardMessage,
  } = useSelector((state) => state.reward);

  const {
    isSuccess: transactionIsSuccess,
    isError: transactionIsError,
    isLoading: transactionIsLoading,
    message: transactionMessage,
  } = useSelector((state) => state.transactions);

  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const [isRedeemModalVisible, setIsRedeemModalVisible] = useState(false);
  const [editingReward, setEditingReward] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);

  const [rewardForm] = Form.useForm(); // Form for Add/Edit Reward
  const [redeemForm] = Form.useForm(); // Form for Redeem Reward

  useEffect(() => {
    dispatch(fetchAllRewards());

    return () => {
      dispatch(resetTransaction()); // Reset transaction state when component unmounts
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      message.error(rewardMessage);
    }
    if (transactionIsError) {
      message.error(transactionMessage);
    }
    dispatch(resetTransaction()); // Reset transaction state when component unmounts
    
  }, [isError, rewardMessage, transactionIsError, transactionMessage, transactionIsSuccess, dispatch]);

  useEffect(() => {
    if (transactionIsSuccess && selectedReward) {
        message.success("Reward redeemed successfully!");
        setIsRedeemModalVisible(false); // Close the redeem modal on success
        dispatch(resetTransaction()); // Reset transaction state after successful redemption
      }
  }, [transactionIsSuccess, selectedReward, dispatch])

  const handleAddReward = () => {
    rewardForm.resetFields();
    setEditingReward(null);
    setIsRewardModalVisible(true);
  };

  const handleEditReward = (reward) => {
    rewardForm.setFieldsValue(reward);
    setEditingReward(reward);
    setIsRewardModalVisible(true);
  };

  const handleDeleteReward = () => {
    if (editingReward) {
      dispatch(deleteReward(editingReward._id));
      message.success("Reward deleted successfully!");
      setIsRewardModalVisible(false);
    }
  };

  const handleSaveReward = async () => {
    try {
      const values = await rewardForm.validateFields();
      if (editingReward) {
        // Update existing reward
        dispatch(updateReward({ rewardId: editingReward._id, rewardData: values }));
        message.success("Reward updated successfully!");
      } else {
        // Create new reward
        dispatch(createNewReward(values));
        message.success("Reward created successfully!");
      }
      setIsRewardModalVisible(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleRedeemReward = (reward) => {
    setSelectedReward(reward);
    redeemForm.resetFields(); // Reset the redeem form
    setIsRedeemModalVisible(true);
  };

  const handleRedeemSubmit = async (values) => {
    try {
      const transactionData = {
        email: values.userEmail,
        rewardId: selectedReward._id,
        description: values.description || "", // Make description optional
      };
      dispatch(createTransactionRedeem(transactionData));
    } catch (error) {
      console.error("Redeem failed:", error);
    }
  };

  const handleCancel = () => {
    setIsRewardModalVisible(false);
    setIsRedeemModalVisible(false);
  };

  if (isLoading || transactionIsLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddReward}
        style={{ marginBottom: 16 }}
      >
        Add Reward
      </Button>

      {/* List of Rewards as Cards */}
      <Row gutter={[16, 16]}>
        {rewards.map((reward) => (
          <Col key={reward._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={reward.name}
              actions={[
                <Button
                  key="edit"
                  icon={<EditOutlined />}
                  onClick={() => handleEditReward(reward)}
                >
                  Edit
                </Button>,
                <Button
                  key="redeem"
                  icon={<GiftOutlined />}
                  onClick={() => handleRedeemReward(reward)}
                >
                  Redeem
                </Button>,
              ]}
              style={{ height: "100%" }} // Ensure all cards have the same height
            >
              <p>
                <strong>Description:</strong> {reward.description}
              </p>
              <p>
                <strong>Points Required:</strong> {reward.pointsRequired}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add/Edit Reward Modal */}
      <Modal
        title={editingReward ? "Edit Reward" : "Add Reward"}
        visible={isRewardModalVisible}
        onOk={handleSaveReward}
        onCancel={handleCancel}
        footer={[
          <Button key="delete" danger onClick={handleDeleteReward} icon={<DeleteOutlined />}>
            Delete
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSaveReward}>
            {editingReward ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <Form form={rewardForm} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="pointsRequired"
            label="Points Required"
            rules={[{ required: true, message: "Please enter the points required" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Redeem Reward Modal */}
      <Modal
        title={`Redeem ${selectedReward?.name}`}
        visible={isRedeemModalVisible}
        onOk={() => redeemForm.submit()}
        onCancel={handleCancel}
        okButtonProps={{ disabled: transactionIsLoading }} // Disable OK button while loading
      >
        <Form form={redeemForm} layout="vertical" onFinish={handleRedeemSubmit}>
          <Form.Item
            name="userEmail"
            label="User Email"
            rules={[
              { required: true, message: "Please enter the user's email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageRewards;