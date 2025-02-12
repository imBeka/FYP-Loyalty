import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions, updatedTransaction, createTransactionEarn, reset } from "../features/transaction/transactionSlice";
import Spinner from "./Spinner";

const ManageTransactions = () => {
  const { 
    transactions, 
    isError: transactionIsError,
    isLoading: transactionIsLoading,
    isSuccess: transactionIsSuccess,
    message: transactionMessage,
  } = useSelector(
    (state) => state.transactions
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch transactions when the component mounts
    dispatch(getTransactions());

    if(transactionIsError){
      message.error(transactionMessage)
      dispatch(reset())
    }
  }, [dispatch, transactionIsSuccess, transactionMessage, transactionIsError]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  const handleAdd = () => {
    addForm.resetFields();
    setIsAddModalVisible(true);
  };

  const handleAddSave = async () => {
    try {
      const values = await addForm.validateFields();
      const transactionData = {
        email: values.userEmail,
        amount: values.amount,
        description: values.description || "",
      };
      dispatch(createTransactionEarn(transactionData));
      if(transactionIsSuccess) {
        message.success("Transaction added successfully!");
      }
      setIsAddModalVisible(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingTransaction(record);
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingTransaction) {
        // Update existing transaction
        dispatch(updatedTransaction(values));
        message.success("Transaction updated successfully!");
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const columns = [
    { title: "User", dataIndex: "userName", key: "userName" },
    { title: "Email", dataIndex: "userEmail", key: "userEmail" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Points Earned", dataIndex: "pointsEarned", key: "pointsEarned" },
    { title: "Points Redeemed", dataIndex: "pointsRedeemed", key: "pointsRedeemed" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Date & Time", dataIndex: "createdAt", key: "createdAt", render: (date) => new Date(date).toLocaleString() },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          Edit
        </Button>
      ),
    },
  ];

  if (transactionIsLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Add Transaction
      </Button>

      <Table
        columns={columns}
        dataSource={transactions}
        rowKey="_id"
        pagination={{ pageSize: 7 }}
        loading={transactionIsLoading}
      />

      {/* Add Transaction Modal */}
      <Modal
        title="Add Transaction"
        visible={isAddModalVisible}
        onOk={handleAddSave}
        onCancel={handleAddCancel}
      >
        <Form form={addForm} layout="vertical">
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
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please enter the amount" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Transaction Modal */}
      <Modal
        title="Edit Transaction"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="_id" label="Transaction ID">
            <Input disabled />
          </Form.Item>
          <Form.Item name="userName" label="User">
            <Input disabled />
          </Form.Item>
          {editingTransaction && editingTransaction.type === 'purchase' ? (
            <>
              <Form.Item
                name="amount"
                label="Transacted Amount"
                rules={[{ required: true, message: "Please enter the amount" }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="pointsEarned"
                label="Points Earned"
                rules={[{ required: true, message: "Please select the points earned" }]}
              >
                <Input type="number" />
              </Form.Item>
            </>
          ) : (
            <Form.Item
              name="pointsRedeemed"
              label="Points Redeemed"
              rules={[{ required: true, message: "Please select the points redeemed" }]}
            >
              <Input type="number" />
            </Form.Item>
          )}
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageTransactions;