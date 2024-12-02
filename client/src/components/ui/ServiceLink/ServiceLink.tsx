import { Icon } from "@/components/ui/Icon";
import { IServiceLink } from "@/types/IServiceLink.ts";
import { Link } from "react-router-dom";

const ServiceLink = (props: IServiceLink) => {
  const {
    imgAlt,
    imgUrl,
    provider,
    service,
    providerClassName,
    serviceClassName,
    linkClassName,
    link,
    optionalLink,
    optionalAlt,
    optionalIcon,
    textInfo,
    textInfoClassName,
    classNameImg,
    icon,
    optionalIconComponent,
    onClickIconSetting,
    iconSetting,
    serviceId,
  } = props;

  return (
    <Link to={link} className={`${linkClassName} overflow-hidden`}>
      <div className="flex items-center overflow-hidden">
        {icon ? (
          icon
        ) : (
          <Icon imgUrl={imgUrl} imgAlt={imgAlt} classNameImg={classNameImg} />
        )}
        <div className="ml-4 overflow-hidden">
          <p className={`${providerClassName} truncate`}>{provider}</p>
          <p className={`${serviceClassName} truncate`}>{service}</p>
          {textInfo && (
            <p className={`${textInfoClassName} truncate`}>{textInfo}</p>
          )}
        </div>
        {optionalIcon && optionalLink && optionalAlt && (
          <Link to={optionalLink} className="ml-4 flex-shrink-0">
            {optionalIconComponent ? (
              optionalIconComponent
            ) : (
              <Icon imgUrl={optionalIcon} imgAlt={optionalAlt} />
            )}
          </Link>
        )}
      </div>
      {onClickIconSetting && serviceId && (
        <button
          type="button"
          onClick={() => onClickIconSetting(serviceId)}
          className="my-auto cursor-pointer flex-shrink-0 focus:outline-none"
        >
          {iconSetting}
        </button>
      )}
    </Link>
  );
};

export default ServiceLink;
