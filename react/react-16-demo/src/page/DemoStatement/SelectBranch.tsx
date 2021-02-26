import React from "react";
import { USER_TYPE } from "./index";
export const SelectUser = ({ onChange }: { onChange: (e: any) => void }) => {
  return (
    <form id="role_form" onChange={onChange}>
      <select defaultValue={USER_TYPE.ADMIN}>
        <option value={USER_TYPE.SUPER_ADMIN} id={USER_TYPE.SUPER_ADMIN}>
          超级管理员
        </option>
        <option value={USER_TYPE.ADMIN} id={USER_TYPE.ADMIN}>
          管理员
        </option>
        <option value={USER_TYPE.USER} id={USER_TYPE.USER}>
          会员用户
        </option>
        <option value={USER_TYPE.LOGIN_USER} id={USER_TYPE.LOGIN_USER}>
          普通用户
        </option>
      </select>
    </form>
  );
};
