import { AntDesignOutlined, GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="2024 奇幻色彩"
      links={[
        {
          key: 'Ant Design',
          title: <AntDesignOutlined />,
          href: 'https://ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/fantasy-color/antd-pro-demo',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
