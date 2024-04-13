import useQueryList from '@/hooks/useQueryList';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormTreeSelect,
  ProFormCheckbox,
} from '@ant-design/pro-components';
import React from 'react';

interface Props {
  newRecord?: boolean;
}

const BasicForm: React.FC<Props> = (props) => {
  const { newRecord } = props;
  const { items: departments } = useQueryList('/departments');
  const { items: roles } = useQueryList('/roles');

  return (
    <>
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
          rules={[{ required: newRecord, message: '请输入密码' }]}
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
      <ProFormCheckbox.Group
        name="roleIds"
        layout="horizontal"
        label="选择角色"
        options={roles?.map((role: { name: string; id: number }) => ({
          label: role.name,
          value: role.id,
        }))}
      />
    </>
  );
};

export default BasicForm;
