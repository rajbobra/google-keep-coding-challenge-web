import React from 'react';

function RenderHTML({ htmlContent }: { htmlContent: string }) {
  return <p dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default RenderHTML;