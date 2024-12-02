import { Block } from "@/components/ui/Block";
import icomoon from "@/constants/icomoon.json";
import { userStore } from "@/stores/userStore.ts";
import { IHomeButtonBlock } from "@/types/IHomeButtonBlock.ts";
import IcoMoon from "react-icomoon";
import { Link, useNavigate } from "react-router-dom";

const HomeButtonBlock = (props: IHomeButtonBlock) => {
  const userId = userStore((state) => state.userId);
  const userHomes = userStore((state) => state.userHomes);
  const navigate = useNavigate();
  const { linkButton, optionalSettingHome } = props;

  // Додаємо тип для події обробника кліку
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, homeId: number) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/home/edit/${homeId}`);
  };

  return (
    <>
      {userHomes &&
        userHomes.map((el) => (
          <Link to={`${el.id}/${linkButton}`} key={el.id}>
            <Block className="my-5 flex justify-between items-center p-4 lg:p-10 cursor-pointer hover:bg-gray50 hover:shadow-lg">
              <div className="flex items-center">
                {userId === el.uuid ? (
                  <IcoMoon
                    iconSet={icomoon}
                    className="h-14 w-14"
                    icon="owner"
                  />
                ) : (
                  <IcoMoon
                    iconSet={icomoon}
                    className="h-14 w-14"
                    icon="profile"
                  />
                )}

                <div className="py-1 pl-4">
                  {el.homeName ? (
                    <div>
                      <p className="text-2xl font-medium text-left">
                        {el.homeName}
                      </p>
                      <p className="text-gray500 text-xl text-left">
                        м. {el.city}, вул. {el.street}, буд. {el.building}, кв.{" "}
                        {el.apartment}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-2xl font-medium">
                        м. {el.city}, вул. {el.street}, буд. {el.building}, кв.{" "}
                        {el.apartment}
                      </p>
                      <p className="text-gray500 text-xl">
                        м. {el.city}, вул. {el.street}, буд. {el.building}, кв.{" "}
                        {el.apartment}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {optionalSettingHome && userId === el.uuid && (
                <button
                  onClick={(e) => handleButtonClick(e, el.id)}
                  className="h-14 w-14 fill-gray700 hover:fill-gray300 focus-ring-brand"
                >
                  <IcoMoon
                    iconSet={icomoon}
                    icon="setting"
                    className="fill-gray600 hover:fill-gray900"
                  />
                </button>
              )}
            </Block>
          </Link>
        ))}
    </>
  );
};

export default HomeButtonBlock;
