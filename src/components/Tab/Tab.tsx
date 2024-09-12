import React, { useEffect, useMemo, useState } from "react";

export type Tab = {
  title: string;
  full?: boolean;
  className?: string;
  Component: React.FC<{
    [key: string]: any;
  }>;
};

export type Flow = {
  index: number;
  title: string;
  className?: string;
  Component: React.FC;
};

const TabComponent: React.FC<{
  tabs: Tab[];
  title: string;
  [key: string]: any;
  full?: boolean;
  onTabChanged?: Function;
  tabStyles?: string;
}> = ({ tabs, title, full, onTabChanged, tabStyles, ...props }) => {
  const [flowIndicators, updateFlowIndicators] = useState<Flow[]>([]);
  const [index, setIndex] = useState(-1);

  const setCurrentFlow = (i: number) => {
    setIndex(i);
    if (onTabChanged) onTabChanged(i + 1);
  };

  useEffect(() => {
    const items = tabs.map((item, i) => ({
      index: i + 1,
      title: item.title,
      Component: item.Component,
      current: i === 0,
      completed: false,
      className: item.className
    }));

    updateFlowIndicators(items);
  }, [tabs]);
  useEffect(() => {
    setIndex(0);
  }, []);
  const activeFlow = useMemo(
    () => flowIndicators.find((_item, i) => index === i),
    [flowIndicators, index]
  );

  return (
    <div className="p-5">
      <div className="bg-white">
        <h3 className="text-neutral600 font-bold">{title}</h3>
        <div className={`my-1 flex h-[54px] w-full gap-0 ${tabStyles}`}>
          {flowIndicators.map((indicator, i) => {
            return (
              <div
                key={`tab-${i}`}
                onClick={() => setCurrentFlow(i)}
                className={`h-full cursor-pointer  ${
                  full ? "w-full" : `w-1/${flowIndicators.length}`
                }  flex items-center justify-center gap-[5px]  px-5 py-3 ${
                  index === i
                    ? "border-b-[3px] border-b-primary400 bg-[#FFF6F4]"
                    : ""
                }`}
              >
                <p className={`${index === i ? "font-bold" : ""}`}>
                  {indicator.title}
                </p>
              </div>
            );
          })}
        </div>
        <div className={` bg-white ${activeFlow?.className}`}>
          {activeFlow?.Component && <activeFlow.Component {...props} />}
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
