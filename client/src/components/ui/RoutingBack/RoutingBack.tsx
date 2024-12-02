import { useNavigate } from "react-router-dom";
import { IRoutingBack } from "@/types/IRoutingBack.ts";

const RoutingBack = (props: IRoutingBack) => {
  const navigate = useNavigate();
  const { text, classNameButton, iconUrl, iconAlt, classNameIcon } = props;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button
      className={`${classNameButton}`}
      onClick={handleGoBack}
      type="button"
    >
      {iconUrl && <img src={iconUrl} alt={iconAlt} className={classNameIcon} />}
      {text}
    </button>
  );
};

export default RoutingBack;
