import React, { ReactElement, ReactNode } from "react"

//child
interface ChildProps {
  text: string;
  className?: string;
}

function Child({ text }: ChildProps): ReactElement {
  return <p>{text}</p>
}

// parent
interface ParentProps {
  item: React.ComponentType<ChildProps>;
}

function Parent({ item: Item, ...props }: ParentProps & ChildProps) {
  return <div>
    <Item {...props} className="child" />
  </div>
}

// use case
function Example4() {
  return (
    <Parent item={Child} text="Hello" />
  )
}