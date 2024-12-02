import { getUserFlowStateFrigade } from "@/services/getUserFlowStateFrigade.ts";
import { IFlowState } from "@/types/IFlowState.ts";

export const fetchFlowState = async (flowSlug: string) => {
  const resp = await getUserFlowStateFrigade("my-user-id");
  const flowState = resp.eligibleFlows.filter(
    (el: IFlowState) => el.flowSlug === flowSlug,
  )[0]?.$state.completed;

  return flowState;
};
