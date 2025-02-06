import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { fetchConfig, createOrUpdateConfig } from "../features/config/configSlice";

const ManageConfig = () => {
  const dispatch = useDispatch();
  const { config, isLoading, isError, message: configMessage } = useSelector(
    (state) => state.config
  );
  const { user } = useSelector((state) => state.auth);

  const [form] = Form.useForm();

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(fetchConfig());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (isError) {
      message.error(configMessage);
    }
  }, [isError, configMessage]);

  useEffect(() => {
    if (config) {
      form.setFieldsValue({
        pointsPerUnit: config.pointsPerUnit,
        unitAmount: config.unitAmount,
      });
    }
  }, [config, form]);

  const handleSaveConfig = async () => {
    try {
      const values = await form.validateFields();
      dispatch(createOrUpdateConfig(values));
      message.success("Configuration updated successfully!");
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  if (!user || !user.isAdmin) {
    return null; // Prevent rendering if user is not an admin
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Manage Configuration</h1>
      <Form form={form} layout="vertical">
        <Form.Item
          name="pointsPerUnit"
          label="Points Per Unit"
          rules={[{ required: true, message: "Please enter points per unit" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="unitAmount"
          label="Unit Amount"
          rules={[{ required: true, message: "Please enter the unit amount" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Button type="primary" onClick={handleSaveConfig}>
          Save Configuration
        </Button>
      </Form>
    </div>
  );
};

export default ManageConfig;