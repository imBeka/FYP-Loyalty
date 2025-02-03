import React, { useEffect, useState } from "react";
import { Layout, Menu, Modal, Form, Input } from "antd";
import {
    UserOutlined,
    TransactionOutlined,
    PieChartOutlined,
    GiftOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import ManageTransactions from "../components/ManageTransactions";
import ManageUsers from "../components/ManageUsers";
import ManageRewards from "../components/ManageRewards";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;

// Constants for menu items
const MENU_ITEMS = [
    { key: "transactions", icon: <TransactionOutlined />, label: "Transactions" },
    { key: "users", icon: <UserOutlined />, label: "Users" },
    { key: "rewards", icon: <GiftOutlined />, label: "Rewards" },
    { key: "analytics", icon: <PieChartOutlined />, label: "Analytics" },
    { key: "settings", icon: <SettingOutlined />, label: "Settings" },
];

export default function AdminDashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState("transactions");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate("/unauthorized");
        }
      }, [user, navigate]);

    const handleMenuClick = (menuKey) => {
        setActiveMenu(menuKey);
    };

    const showModal = (record) => {
        setModalData(record);
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        console.log("Updated data:", modalData);
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const renderContent = () => {
        switch (activeMenu) {
        case "transactions":
            return <ManageTransactions onEdit={showModal} />;
        case "users":
            return <ManageUsers onEdit={showModal} />;
        case "analytics":
            return <Analytics />;
        case "rewards":
            return <ManageRewards onEdit={showModal} />;
        case "settings":
            return <Settings />;
        default:
            return null;
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="logo" style={{ color: "white", padding: "16px", textAlign: "center" }}>
            Admin Panel
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["transactions"]}>
            {MENU_ITEMS.map((item) => (
                <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick(item.key)}>
                {item.label}
                </Menu.Item>
            ))}
            </Menu>
        </Sider>
        <Layout>
            <Header style={{ background: "#fff", padding: 0, textAlign: "center" }}>
            <h1>{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}</h1>
            </Header>
            <Content style={{ margin: "16px" }}>{renderContent()}</Content>
        </Layout>

        {/* Modal for editing data */}
        <Modal
            title="Edit Details"
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
        >
            <Form layout="vertical" initialValues={modalData}>
            <Form.Item label="Field 1" name="field1">
                <Input />
            </Form.Item>
            <Form.Item label="Field 2" name="field2">
                <Input />
            </Form.Item>
            </Form>
        </Modal>
        </Layout>
    );
}

// Component: Manage Transactions

// Component: Analytics
const Analytics = () => {
  return <div>Analytics Section (Charts go here)</div>;
};

// Component: Manage Rewards
// const ManageRewards = ({ onEdit }) => {
//   return <div>Manage Rewards Section</div>;
// };

// Component: Settings
const Settings = () => {
  return <div>Settings Section</div>;
};