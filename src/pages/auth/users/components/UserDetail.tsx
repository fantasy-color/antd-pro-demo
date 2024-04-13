import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import React from 'react';

interface Props {
  currentRow: API.ListItem;
  columns: ProDescriptionsItemProps<API.ListItem>[];
  open: boolean;
  onClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

const UserDetail: React.FC<Props> = (props) => {
  const { currentRow, columns, open, onClose } = props;

  return (
    <>
      <Drawer width={600} open={open} onClose={onClose} closable={false}>
        {currentRow?.username && (
          <ProDescriptions<API.ListItem>
            column={2}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.username,
            }}
            columns={columns as ProDescriptionsItemProps<API.ListItem>[]}
          />
        )}
      </Drawer>
    </>
  );
};

export default UserDetail;
