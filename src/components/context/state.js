import React from 'react';

import { AlertProvider } from './alert.context';
import { TagProvider } from './tag.context';
import { AuthProvider } from './auth.context';
import { LoadingProvider } from './loading.context';

function ProviderComposer({ context, children }) {
  return context.reduceRight(
    (kids, parent) => React.cloneElement(parent, { children: kids }),
    children
  );
}

function ContextProvider({ children }) {
  return (
    <ProviderComposer
      context={[
        <AlertProvider />,
        <TagProvider />,
        <AuthProvider />,
        <LoadingProvider />
      ]}
    >
      {children}
    </ProviderComposer>
  );
}

export { ContextProvider };
