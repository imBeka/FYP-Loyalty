import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, message, Row, Col, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { getAllUsers, reset, updateUserByEmail } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const ManageUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message: errorMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      message.error(errorMessage);
    }

    // Redirect to login if user is not logged in or not an admin
    if (!user || !user.isAdmin) {
      navigate("/login");
    }

    // Fetch all users if the user is an admin
    if (user && user.isAdmin) {
      dispatch(getAllUsers());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, errorMessage, dispatch]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingUser(record);
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        // Update existing user
        dispatch(updateUserByEmail(values));
        message.success("User updated successfully!");
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Prevent rendering if user is not logged in or not an admin
  if (!user || !user.isAdmin) {
    return null; // Or return a loading spinner or redirect component
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {/* Grid Layout for Users */}
      <Row gutter={[16, 16]}>
        {users.map((user) => (
          <Col key={user._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={user.name}
              actions={[
                <Button
                  key="edit"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </Button>,
              ]}
            >
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Points:</strong> {user.points}
              </p>
              <p>
                <strong>Role:</strong> {user.isAdmin ? "Admin" : "User"}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isAdmin"
            label="Role"
            rules={[{ required: true, message: "Please select the role" }]}
          >
            <Select>
              <Option value={true}>Admin</Option>
              <Option value={false}>User</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="points"
            label="Points"
            rules={[{ required: true, message: "Please enter the points" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUsers;