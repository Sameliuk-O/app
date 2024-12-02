import { Block } from "@/components/ui/Block";

const LoadingSkeletonService = () => {
  return (
    <Block>
      <div className="h-24 bg-slate-200 animate-pulse mb-10 rounded-2xl"></div>
      <div className="flex space-x-4 mb-10 animate-pulse">
        <div className="bg-slate-200 h-20 w-20 rounded-2xl"></div>
        <div className="bg-slate-200 h-20 w-20 rounded-2xl"></div>
        <div className="bg-slate-200 h-20 w-20 rounded-2xl"></div>
        <div className="bg-slate-200 h-20 w-20 rounded-2xl"></div>
        <div className="bg-slate-200 h-20 w-20 rounded-2xl"></div>
        <div className="bg-slate-200 h-20 w-20 rounded-2xl"></div>
      </div>
      <div className="h-14 bg-slate-200 w-1/2 rounded-2xl mb-10 animate-pulse"></div>
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-200 h-20 w-20"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-20 bg-slate-200 rounded-2xl w-full mb-10"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4 ml-[-100px]">
              <div className="h-14 bg-slate-200 rounded-2xl col-span-1"></div>
              <div className="h-14 bg-slate-200 rounded-2xl col-span-1"></div>
            </div>
            <div className="h-24 bg-slate-200 rounded-2xl ml-[-100px] w-2/3 mt-10"></div>
            <div className="h-24 bg-slate-200 rounded-2xl ml-[-100px]"></div>
            <div className="h-24 bg-slate-200 rounded-2xl ml-[-100px]"></div>
            <div className="h-24 bg-slate-200 rounded-2xl ml-[-100px]"></div>
            <div className="grid grid-cols-2 gap-4 ml-[-100px]">
              <div className="h-14 bg-slate-200 rounded-2xl col-span-1"></div>
              <div className="h-14 bg-slate-200 rounded-2xl col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
};

export default LoadingSkeletonService;
