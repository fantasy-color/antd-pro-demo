import { addItem, queryList, removeItem, updateItem } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button, Modal, Select, Tag, TreeSelect, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import useQueryList from '@/hooks/useQueryList';
import CreateForm from './components/CreateForm';
import UserDetail from './components/UserDetail';

/**
 * @description 新建用户
 * @param fields
 */
const handleAdd = async (fields: API.ListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addItem('/users', { ...fields });
    hide();
    message.success('创建成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(error?.response?.data?.message || '创建失败，请稍后重试');
    return false;
  }
};

/**
 * @description 编辑用户
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新');
  try {
    await updateItem(`/users/${fields.id}`, fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(error?.response?.data?.message || '更新失败，请稍后重试');
    return false;
  }
};

/**
 * @description 删除用户
 * @param fields
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (!ids) return true;
  try {
    await removeItem('/users', {
      ids,
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(error?.response?.data?.message || '删除失败，请稍后重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ListItem[]>([]);

  const { items: roles } = useQueryList('/roles');
  const { items: departments } = useQueryList('/departments');

  const columns: ProColumns<API.ListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'username',
      width: 150,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '登录名',
      dataIndex: 'email',
      width: 200,
      copyable: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: 100,
      valueEnum: {
        男: { text: '男' },
        女: { text: '女' },
      },
    },
    {
      title: '是否超级管理员',
      dataIndex: 'isAdmin',
      width: 200,
      render: (val) => {
        return val ? <Tag color="success">是</Tag> : <Tag color="default">否</Tag>;
      },
      valueEnum: {
        true: { text: '是' },
        false: { text: '否' },
      },
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: 100,
      renderText: (val: { depName: 'string' }) => val?.depName,
      renderFormItem: () => {
        return (
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择"
            allowClear
            treeDefaultExpandAll
            treeData={departments}
          />
        );
      },
    },
    {
      title: '角色',
      dataIndex: 'roles',
      width: 250,
      renderText: (val: { name: 'string' }[]) => val?.map((item) => item.name).join('，'),
      ellipsis: true,
      renderFormItem: () => {
        return (
          <Select
            showSearch
            placeholder="请选择"
            optionFilterProp="children"
            filterOption={(input: string, option?: { label: string; value: string }) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={roles?.map((role: { name: string; id: number }) => ({
              label: role.name || '',
              value: String(role.id) || '',
            }))}
          />
        );
      },
    },
    {
      title: '在职状态',
      dataIndex: 'status',
      width: 100,
      render: (val) => {
        return val === '在职' ? <Tag color="success">是</Tag> : <Tag color="default">否</Tag>;
      },
      valueEnum: {
        在职: { text: '在职' },
        离职: { text: '离职' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'date',
      width: 100,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 100,
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            return Modal.confirm({
              title: '删除用户',
              content: '确定删除该用户吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                await handleRemove([record.id!]);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              },
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ListItem, API.PageParams>
        headerTitle="员工管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        pagination={{ defaultPageSize: 10 }}
        scroll={{ x: 1500 }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={async (params, sort, filter) => queryList('/users', params, sort, filter)}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            type="primary"
            danger
            onClick={() => {
              return Modal.confirm({
                title: '删除用户',
                content: '确定删除该用户吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                  await handleRemove(selectedRowsState?.map((item) => item.id!));
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                },
              });
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <CreateForm
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.ListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={handleUpdateModalOpen}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />
      <UserDetail
        currentRow={currentRow as API.ListItem}
        columns={columns as ProDescriptionsItemProps<API.ListItem>[]}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
      />
    </PageContainer>
  );
};

export default TableList;
