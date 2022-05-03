import React from 'react';

type Props = {
  renderHeader: () => JSX.Element;
  renderContent: () => JSX.Element;
  renderFooter?: () => JSX.Element;
};

export function Layout({ renderHeader, renderContent, renderFooter }: Props) {
  return (
    <div>
      {renderHeader()}
      <hr />
      {renderContent()}
      {renderFooter && renderFooter()}
    </div>
  );
}

