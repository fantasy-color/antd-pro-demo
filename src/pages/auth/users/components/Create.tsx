import useQueryList from '@/hooks/useQueryList';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import React from 'react';

interface Props {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  onFinish?: (formData: any) => Promise<void>;
}

const Create: React.FC<Props> = (props) => {
  const { open, onOpenChange, onFinish } = props;
  const { items: departments } = useQueryList('/departments');

  return (
    <ModalForm
      title="新增员工"
      width="740px"
      open={open}
      onOpenChange={onOpenChange}
      onFinish={onFinish}
    >
      <ProForm.Group>
        <ProFormText
          rules={[{ required: true, message: '请输入姓名' }]}
          width="md"
          label="姓名"
          name="username"
        />
        <ProFormText
          rules={[{ required: true, message: '请输入电子邮箱' }]}
          width="md"
          label="电子邮箱"
          name="email"
        />
        <ProFormSelect
          name="gender"
          label="性别"
          width="md"
          valueEnum={{
            男: '男',
            女: '女',
          }}
          placeholder="请选择"
          rules={[{ required: true, message: '请选择性别' }]}
        />
        <ProFormText
          rules={[{ required: true, message: '请输入密码' }]}
          width="md"
          label="密码"
          name="password"
        />
        <ProFormTreeSelect
          name="departmentId"
          placeholder="请选择"
          allowClear
          label="部门"
          width="md"
          secondary
          fieldProps={{
            showArrow: false,
            filterTreeNode: true,
            showSearch: true,
            treeDefaultExpandAll: true,
            dropdownMatchSelectWidth: false,
            autoClearSearchValue: true,
            treeNodeFilterProp: 'title',
            fieldNames: {
              label: 'title',
            },
            treeData: departments,
          }}
          rules={[{ required: true, message: '请选择' }]}
        />
        <ProFormSelect
          name="status"
          label="是否在职"
          width="md"
          valueEnum={{
            在职: '在职',
            离职: '离职',
          }}
          placeholder="请选择"
          rules={[{ required: true, message: '请选择' }]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default Create;
