import { ProForm, ProFormText } from '@ant-design/pro-components';
import React from 'react';

interface Props {
  newRecord?: boolean;
}

const BasicForm: React.FC<Props> = () => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
          rules={[{ required: true, message: '请输入名称' }]}
          width="md"
          label="名称"
          name="name"
        />
      </ProForm.Group>
    </>
  );
};

export default BasicForm;
