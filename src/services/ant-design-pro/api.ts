// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/users/profile', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取列表数据 GET */
export async function queryList(
  url: string,
  params?: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort?: { [key: string]: any },
  filter?: { [key: string]: any },
) {
  return request<API.DataList>(url, {
    method: 'GET',
    params: {
      ...params,
      sorter: sort,
      ...filter,
    },
  });
}

/** 新建用户 */
export async function addItem(url: string, options?: { [key: string]: any }) {
  return request<API.ListItem>(url, {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

/** 修改用户 */
export async function updateItem(url: string, options?: { [key: string]: any }) {
  return request<API.ListItem>(url, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}

/** 删除用户 */
export async function removeItem(url: string, options?: { [key: string]: any }) {
  return request<Record<string, any>>(url, {
    method: 'DELETE',
    data: {
      ...(options || {}),
    },
  });
}
