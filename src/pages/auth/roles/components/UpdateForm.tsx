import React from 'react';
import BasicForm from './BasicForm';
import { ModalForm } from '@ant-design/pro-components';
import { Form } from 'antd';

export type FormValueType = Partial<API.ListItem>;

export type UpdateFormProps = {
  onCancel: (visible: boolean) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: {
    permissions?: { id: number }[];
  } & Partial<API.ListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalOpen, onCancel, onSubmit, values } = props;
  const [form] = Form.useForm();

  return (
    <ModalForm
      form={form}
      title="修改角色"
      width="740px"
      open={updateModalOpen}
      onOpenChange={onCancel}
      onFinish={onSubmit}
      initialValues={{ ...values }}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
    >
      <BasicForm form={form} permissions={values.permissions} />
      <Form.Item name="id" label={false} />
    </ModalForm>
  );
};

export default UpdateForm;
