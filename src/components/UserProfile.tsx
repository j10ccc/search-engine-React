import React, { useState } from "react";
import { Card, Avatar, Button, Modal, Form, Input, message } from "antd";
import {
  LockOutlined,
  LogoutOutlined,
  SmileOutlined,
  UserAddOutlined,
  UserOutlined
} from "@ant-design/icons";
import { loginAPI, registerAPI } from "../api/login";
import { LoginInfo } from "../pages/SearchResult";
const { Meta } = Card;

export default function UserProfile(props: any) {
  // TODO: read session state
  const { onlineState, setOnlineState, userName, setUserName } =
    LoginInfo.useContainer();

  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState("登录");
  const [form] = Form.useForm();

  const operate = [
    <Button type="link" icon={<LogoutOutlined />} onClick={exit}>
      注销
    </Button>,
    [
      <Button
        type="link"
        icon={<SmileOutlined />}
        onClick={() => {
          setFormType("登录");
          setFormVisible(true);
        }}>
        登录
      </Button>,
      <Button
        type="link"
        icon={<UserAddOutlined />}
        onClick={() => {
          setFormType("注册");
          setFormVisible(true);
        }}>
        注册
      </Button>
    ]
  ];

  function exit() {
    document.cookie = "search_engine" + "=; Max-Age=0;path=/api";
    setUserName(undefined);
    setOnlineState(false);
  }
  function login(val: any) {
    loginAPI(val)
      .then((res) => {
        if (res.data.msg === "SUCCESS") {
          message.success("登录成功");
          setUserName(val.username);
          setOnlineState(true);
          onCancel();
        } else if (res.data.msg === "USERNAME_ERROR")
          message.error("未找到该用户");
        else if (res.data.msg === "PWD_ERROR") message.error("密码错误");
      })
      .catch((err) => {
        message.error(err);
      });
  }

  function register(val: any) {
    registerAPI({ username: val.userName, pwd: val.pwd }).then((res) => {
      if (res.data.msg === "SUCCESS") {
        message.success("注册成功，已自动登录");
        setUserName(val.username);
        setOnlineState(true);
        onCancel();
      } else if (res.data.msg === "USERNAME_ERROR")
        message.error("该用户名已被注册");
    });
  }
  function onCancel() {
    setFormVisible(false);
    form.resetFields();
  }

  return (
    <>
      <Card actions={[onlineState ? operate[0] : operate[1]]}>
        <Meta
          avatar={<Avatar>{onlineState ? userName : "?"}</Avatar>}
          title={onlineState ? userName : "未登录"}
          description={
            onlineState
              ? "这个人很懒，什么都没留下。"
              : "点击下方按钮选择登录吧！"
          }
        />
      </Card>
      <Modal
        visible={formVisible}
        title={formType}
        okText={formType}
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          form.validateFields().then((values) => {
            form.resetFields();
            formType === "登录" ? login(values) : register(values);
          });
        }}
        style={{ zIndex: "1001" }}>
        <Form
          form={form}
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={formType === "登录" ? login : register}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入你的用户名!" }]}>
            <Input prefix={<UserOutlined />} placeholder="请输入你的用户名" />
          </Form.Item>
          <Form.Item
            name="pwd"
            rules={[{ required: true, message: "请输入密码!" }]}>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          {formType === "注册" ? (
            <Form.Item
              name="confrimPwd"
              rules={[{ required: true, message: "请确认密码!" }]}>
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="确认密码"
              />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </>
  );
}
