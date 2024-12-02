import { Icon } from "@/components/ui/Icon";
import { IUserBlock } from "@/types/IUserBlock.ts";
import classNames from "classnames";

const UserBlock = (props: IUserBlock) => {
  const {
    firstName,
    lastName,
    userRoleText,
    classNameRole,
    email,
    imgUrl,
    imgAlt,
    classNameImg,
    onClickIconSetting,
    onClickBlock,
    userId,
    classNameButtonBlock,
    imgAddUserUrl,
    imgAddUserAlt,
    imgAddUserClassName,
    iconAddUser,
    icon,
  } = props;

  const str = firstName && lastName ? firstName + " " + lastName : email;

  const initials =
    str &&
    str
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");

  return (
    <button
      role="button"
      className={classNames(
        "border border-gray300 rounded-2xl flex py-6 pl-5 pr-4 justify-between overflow-hidden text-left items-center hover:bg-gray25 focus-ring-brand hover:shadow-lg",
        {
          [`${classNameButtonBlock}`]: !!classNameButtonBlock,
        },
      )}
      onClick={() => onClickBlock && onClickBlock()}
    >
      <div className="flex items-center overflow-hidden">
        {initials ? (
          <div className="bg-gray300 rounded-full w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] flex items-center justify-center mr-2.5 text-2xl text-white">
            {initials.toUpperCase()}
          </div>
        ) : (
          <div className="flex-shrink-0">
            {iconAddUser ? (
              iconAddUser
            ) : (
              <Icon
                imgUrl={imgAddUserUrl}
                imgAlt={imgAddUserAlt}
                classNameImg={imgAddUserClassName}
              />
            )}
          </div>
        )}
        <div className="overflow-hidden">
          <p className={classNames(classNameRole, "truncate")}>
            {userRoleText}
          </p>
          <p className="text-2xl truncate">
            {firstName && lastName ? firstName + " " + lastName : email}
          </p>
        </div>
      </div>
      {onClickIconSetting && userId && (
        <button
          type="button"
          onClick={() => onClickIconSetting(userId)}
          className="my-auto cursor-pointer flex-shrink-0"
        >
          {icon ? (
            icon
          ) : (
            <Icon imgUrl={imgUrl} imgAlt={imgAlt} classNameImg={classNameImg} />
          )}
        </button>
      )}
    </button>
  );
};

export default UserBlock;
