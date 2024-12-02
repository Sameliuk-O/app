import { HomeButtonBlock } from "@/components/HomeButtonBlock";
import icomoon from "@/constants/icomoon.json";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Block } from "@/components/ui/Block";
import { getUserHomes } from "@/services/getUserHomes.ts";
import { IStore, userStore } from "@/stores/userStore.ts";
import IcoMoon from "react-icomoon";
import { Link } from "react-router-dom";

const Homes = () => {
  const userId = userStore((state) => state.userId);
  const setUserHomes = userStore((state: IStore) => state.setUserHomes);
  const [isHover, setIsHover] = useState(false);

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
  }, [fetchUserHomes, userId]);

  return (
    <Block className="border-0 px-0">
      <Link
        to={"create"}
        className="text-gray-500"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Block className="p-5 flex items-center focus-ring-brand lg:p-10 cursor-pointer hover:bg-gray50 hover:shadow-lg">
          <IcoMoon
            iconSet={icomoon}
            icon="add_home"
            className={classNames("h-14 w-14 fill-gray700", {
              "fill-gray900": isHover,
            })}
          />
          <span
            className={classNames("pl-4 text-2xl t", {
              "text-gray800": isHover,
            })}
          >
            Додати помешкання
          </span>
        </Block>
      </Link>
      <HomeButtonBlock linkButton="service" optionalSettingHome />
    </Block>
  );
};

export default Homes;
