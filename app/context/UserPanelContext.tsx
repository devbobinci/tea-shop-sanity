"use client";

import React, { createContext, Dispatch, useContext, useState } from "react";

type UserPanelContext = {
  userPanel: boolean;
  setUserPanel: Dispatch<React.SetStateAction<boolean>>;
};

const UserPanelContext = createContext({} as UserPanelContext);

type Props = {
  children: React.ReactNode;
};

export function UserPanelContextProvider({ children }: Props) {
  const [userPanel, setUserPanel] = useState<boolean>(false);

  return (
    <UserPanelContext.Provider value={{ userPanel, setUserPanel }}>
      {children}
    </UserPanelContext.Provider>
  );
}

export default UserPanelContext;

export function useUserPanelContext() {
  return useContext(UserPanelContext);
}
