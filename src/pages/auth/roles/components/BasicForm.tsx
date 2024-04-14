import useQueryList from '@/hooks/useQueryList';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { TreeProps, Tree, FormInstance, Form } from 'antd';
import React, { Key, useState } from 'react';

interface Props {
  form: FormInstance<any>;
}

const BasicForm: React.FC<Props> = (props) => {
  const { form } = props;
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const { items: permissionGroups } = useQueryList('/permission_groups');

  const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue as Key[]);

    const permissions = (checkedKeysValue as Key[]).filter((key: Key) =>
      key.toString().startsWith('permission'),
    );
    const permissionIds = permissions.map((key: Key) =>
      Number(key.toString().replace('permission-', '')),
    );

    form.setFieldsValue({
      permissionIds,
    });
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <>
      <ProForm.Group>
        <ProFormText
          rules={[{ required: true, message: '请输入名称' }]}
          width="md"
          label="名称"
          name="name"
        />
        <Form.Item name="permissionIds">
          <div>选择权限</div>
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={permissionGroups}
          />
        </Form.Item>
      </ProForm.Group>
    </>
  );
};

export default BasicForm;
