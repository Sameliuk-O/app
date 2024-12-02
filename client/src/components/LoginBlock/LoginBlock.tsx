import icomoon from "@/constants/icomoon.json";
import useLogout from "@/services/handleLogoutUser.ts";
import { ILoginBlock } from "@/types/ILoginBlock.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import { useKeycloak } from "@react-keycloak/web";
import IcoMoon from "react-icomoon";
import { useNavigate } from "react-router-dom";

const LoginBlock = (props: ILoginBlock) => {
  const { classNameBlock } = props;

  const handleLogoutUser = useLogout();
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    handleLogoutUser();
    keycloak.logout();
  };

  const { token } = getLocalStoreToken();

  return (
    <div className={classNameBlock}>
      <div className="flex gap-x-4 hover:text-gray500 ">
        {!keycloak.authenticated &&
        token !== undefined &&
        token.length === 0 ? (
          <>
            <button
              type="button"
              className="flex font-semibold font-heading text-xl text-gray300 hover:text-gray500 focus-ring-brand"
              onClick={() => {
                keycloak.login();
              }}
            >
              <IcoMoon
                iconSet={icomoon}
                icon="login"
                className="mr-3 h-10 w-10"
              />
              Авторизація
            </button>
            <button
              type="button"
              className="flex font-semibold font-heading text-xl text-gray300 hover:text-gray500 focus-ring-brand"
              onClick={() => {
                keycloak.register();
              }}
            >
              <IcoMoon
                iconSet={icomoon}
                icon="login"
                className=" mr-3 h-10 w-10"
              />
              Реєстрація
            </button>
          </>
        ) : (
          <button
            type="button"
            className="flex font-semibold font-heading text-xl text-gray400 hover:text-gray500 focus-ring-brand"
            onClick={handleLogout}
          >
            <IcoMoon iconSet={icomoon} icon="logout" className="mr-3 h-7 w-7" />
            Вийти
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginBlock;
