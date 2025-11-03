import { h } from '@stencil/core';

export const Typography = (args: { typename: string[] }) => {
  return (
    <div>
      {args.typename.map(typename => 
        <div sy-typography syType={typename}>{typename}</div>
      )}
    </div>
  );
};

export const TypographyHeading = (args: { typenames: string[] }) => {
  return (
    <div>
      {args.typenames.map((typename: string, index: number) => {
        const HeadingTag = `h${index + 1}` as any;
        return <HeadingTag sy-typography>{typename}</HeadingTag>;
      })}
    </div>
  );
};