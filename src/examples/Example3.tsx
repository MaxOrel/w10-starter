import React, { ReactElement, ReactNode } from "react";

//child
interface ChildProps {
  text: string;
  className?: string;
}

function Child({ text, className }: ChildProps): ReactElement {
  return <p className={className}>{text}</p>;
}

// parent
interface ChildCallbackProps {
  className: string;
  text: string;
}

interface ParentProps {
  children: (props: ChildCallbackProps) => ReactNode;
  data: {
    className: string;
    text: string;
  }
}

function Parent({ data, children }: ParentProps) {
  const { className, text } = data;
  return <div>{children({ className: className, text: text })}</div>;
}

// use case
function Example3() {
  return (
    //слайдер новостей
    <Parent data={{ className: 'slider', text: 'Слайдер' }}>
      {({ className, text }) => <Child text={text} className={className} />}
    </Parent>

  );
}
