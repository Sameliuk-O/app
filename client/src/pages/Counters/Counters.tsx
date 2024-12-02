import { HomeButtonBlock } from "@/components/HomeButtonBlock";
import { Block } from "@/components/ui/Block";
import { getUserHomes } from "@/services/getUserHomes.ts";
import { IStore, userStore } from "@/stores/userStore.ts";
import { useEffect } from "react";

const Counters = () => {
  const userId = userStore((state) => state.userId);
  const setUserHomes = userStore((state: IStore) => state.setUserHomes);

  const fetchUserHomes = async () => {
    try {
      const homes = await getUserHomes(userId);
      homes !== false && setUserHomes(homes);
    } catch (error) {
      console.error("Error fetching user homes:", error);
    }
  };

  useEffect(() => {
    userId !== "" && fetchUserHomes();
  }, [userId]);

  return (
    <Block className="border-0">
      <HomeButtonBlock linkButton="services" />
    </Block>
  );
};

export default Counters;
