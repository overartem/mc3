import { useEffect, useState } from "react";

function UseBodyClass(pageClass: string): string {
  const [bodyClass, setBodyClass] = useState<string>(pageClass);

  useEffect(() => {
    if (bodyClass) {
      setBodyClass(pageClass);
      document.body.classList.add(bodyClass);
      return () => {
        document.body.classList.remove(bodyClass);
      };
    }

    return () => {
      if (bodyClass) {
        document.body.classList.remove(bodyClass);
      }
    };
  }, [bodyClass, pageClass]);

  return bodyClass;
}

export default UseBodyClass;
