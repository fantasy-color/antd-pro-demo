import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import React, { Key, useState } from 'react';
import { Tree, TreeProps } from 'antd';
import useQueryList from '@/hooks/useQueryList';

interface Props {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  onFinish: (formData: any) => Promise<void>;
}

const Create: React.FC<Props> = (props) => {
  const { open, onOpenChange, onFinish } = props;
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
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <ModalForm
      title="新增角色"
      width="740px"
      open={open}
      onOpenChange={onOpenChange}
      onFinish={async (values: any) => {
        const permissions = (checkedKeys as Key[]).filter((key: Key) =>
          key.toString().startsWith('permission'),
        );
        const permissionIds = permissions.map((key: Key) =>
          Number(key.toString().replace('permission-', '')),
        );
        await onFinish({ ...values, permissionIds: permissionIds });
      }}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
    >
      <ProForm.Group>
        <ProFormText
          rules={[{ required: true, message: '请输入名称' }]}
          width="md"
          label="名称"
          name="name"
        />
        <div>
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
        </div>
      </ProForm.Group>
    </ModalForm>
  );
};

export default Create;
