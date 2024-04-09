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
          key: 'ProComponents',
          title: 'ProComponents',
          href: 'https://pro-components.antdigital.dev/',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: <AntDesignOutlined />,
          href: 'https://ant-design.antgroup.com/index-cn',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/fantasy-color/pro-demo',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
