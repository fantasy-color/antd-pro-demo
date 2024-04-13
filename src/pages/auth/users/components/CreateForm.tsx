import { ModalForm } from '@ant-design/pro-components';
import React from 'react';
import BasicForm from './BasicForm';

interface Props {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  onFinish?: (formData: any) => Promise<void>;
}

const Create: React.FC<Props> = (props) => {
  const { open, onOpenChange, onFinish } = props;

  return (
    <ModalForm
      title="新增员工"
      width="740px"
      open={open}
      onOpenChange={onOpenChange}
      onFinish={onFinish}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
    >
      <BasicForm newRecord />
    </ModalForm>
  );
};

export default Create;
