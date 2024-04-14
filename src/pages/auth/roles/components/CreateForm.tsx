import { ModalForm } from '@ant-design/pro-components';
import React from 'react';
import BasicForm from './BasicForm';
import { Form } from 'antd';

interface Props {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  onFinish: (formData: any) => Promise<void>;
}

const Create: React.FC<Props> = (props) => {
  const { open, onOpenChange, onFinish } = props;
  const [form] = Form.useForm();

  return (
    <ModalForm
      form={form}
      title="新增角色"
      width="740px"
      open={open}
      onOpenChange={onOpenChange}
      onFinish={onFinish}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
    >
      <BasicForm form={form} />
    </ModalForm>
  );
};

export default Create;
