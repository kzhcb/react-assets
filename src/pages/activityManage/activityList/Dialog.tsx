import React, { useEffect, useState } from 'react';
import { Input, Modal, Form } from 'antd';
const { TextArea } = Input;
import type { ColumnsType } from 'antd/es/table';
import type { FormInstance } from 'antd/es/form';
import { nanoid } from 'nanoid';

export default function Dialog(props: any) {
  const formRef = React.createRef<FormInstance>();
  const { isModalVisible, handleOk, setIsModalVisible } = props;
  useEffect(() => {
    if (isModalVisible) {
      formRef.current?.resetFields();
    }
  }, [isModalVisible]);

  const onFinish = (values: any) => {
    const flowGroup = window.localStorage.getItem('flowGroup');
    // if (flowGroup) {
    //   const temp = JSON.parse(flowGroup);
    //   temp.push({
    //     ...values,
    //     id: nanoid(),
    //     status: 'enable',
    //     creatTime: '2022-8-17',
    //     updateTime: '2022-8-17',
    //   }); //TODO:记得修改
    //   window.localStorage.setItem('flowGroup', JSON.stringify(temp));
    // } else {
    //   window.localStorage.setItem(
    //     'flowGroup',
    //     JSON.stringify([
    //       {
    //         ...values,
    //         id: nanoid(),
    //         status: 'enable',
    //         creatTime: '2022-8-17',
    //         updateTime: '2022-8-17',
    //       },
    //     ]), //TODO:记得修改
    //   );
    // }
    window.localStorage.setItem('flow', JSON.stringify(values));
    setIsModalVisible(false);
    handleOk(); //TODO:记得修改
  };
  const confirm = () => {
    formRef.current
      ?.validateFields()
      .then((value) => {
        formRef.current?.submit();
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  return (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={confirm}
      onCancel={() => setIsModalVisible(false)}
    >
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="流程名称"
          name="name"
          rules={[{ required: true, message: '请输入流程名称!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="备注" name="remarks">
          <TextArea rows={4} placeholder="maxLength is 6" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
