import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import React from 'react';

interface Props {
  currentRow: API.UserListItem;
  columns: ProDescriptionsItemProps<API.UserListItem>[];
  open: boolean;
  onClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

const UserDetail: React.FC<Props> = (props) => {
  const { currentRow, columns, open, onClose } = props;

  return (
    <>
      <Drawer width={600} open={open} onClose={onClose} closable={false}>
        {currentRow?.name && (
          <ProDescriptions<API.UserListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.UserListItem>[]}
          />
        )}
      </Drawer>
    </>
  );
};

export default UserDetail;
