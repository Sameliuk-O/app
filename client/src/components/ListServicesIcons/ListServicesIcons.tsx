import { Icon } from "@/components/ui/Icon";
import { providers } from "@/constants/providers.ts";
import { userStore } from "@/stores/userStore.ts";
import { IListServicesIcons } from "@/types/IListServicesIcons.ts";
import classNames from "classnames";

const ListServicesIcons = (props: IListServicesIcons) => {
  const { handleActiveService, activeService } = props;
  const homeServices = userStore((state) => state.homeServices);

  return (
    <div className="block">
      <div className="overflow-x-scroll whitespace-nowrap my-5 py-5">
        {homeServices.map((el) =>
          providers.map(
            (provider) =>
              provider.serviceName === el.serviceName && (
                <button
                  key={el.id}
                  type="button"
                  onClick={() => {
                    handleActiveService(el.id, el.serviceName);
                  }}
                  className={classNames(
                    "inline-block mx-1.5 lg:mx-3.5 p-2 sm:p- rounded-2xl border hover:bg-greenLight w-14 h-14 sm:w-20 sm:h-20 focus-ring-brand hover:border-brand200  hover:bg-brand25",
                    {
                      ["bg-brand25  border-brand200"]: activeService === el.id,
                    },
                  )}
                >
                  <Icon imgUrl={provider.icon} imgAlt={provider.serviceName} />
                </button>
              ),
          ),
        )}
      </div>
    </div>
  );
};

export default ListServicesIcons;
