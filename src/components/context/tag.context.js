import React, { createContext, useState } from 'react';

export const TagContext = createContext();

export function TagProvider({ children }) {
  const [tags, setTags] = useState([
    { id: 1, name: 'education', selected: false },
    { id: 2, name: 'technology', selected: false },
    { id: 3, name: 'association', selected: false },
    { id: 4, name: 'national', selected: false },
    { id: 5, name: 'university', selected: false }
  ]);

  return (
    <TagContext.Provider value={{ tags, setTags }}>
      {children}
    </TagContext.Provider>
  );
}
