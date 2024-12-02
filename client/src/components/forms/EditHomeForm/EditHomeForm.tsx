import { Button } from "@/components/ui/Button";
import { CheckBox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { UpdateHomeData, updateUserHome } from "@/services/updateUserHome.ts";
import { userStore } from "@/stores/userStore.ts";
import { IEditHome } from "@/types/IEditHome.ts";
import classNames from "classnames";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RoutingBack from "../../ui/RoutingBack/RoutingBack.tsx";
const EditHomeForm = (props: IEditHome) => {
  const { homeId, userId } = props;
  const userHomes = userStore((state) => state.userHomes);

  const currentHome = userHomes.find(
    (el) => homeId && +homeId === el.id && userId === el.uuid,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateHomeData>({
    defaultValues: {
      homeName: currentHome?.homeName,
      city: currentHome?.city,
      street: currentHome?.street,
      building: currentHome?.building,
      apartment: currentHome?.apartment,
      privateHome: currentHome?.privateHome,
    },
  });

  const isPrivateHomeValue = watch("privateHome");

  const allField = watch();

  const isAllFieldFilled =
    allField.city.length > 0 &&
    allField.street.length > 0 &&
    allField.building.length > 0 &&
    ((!allField.privateHome &&
      allField.apartment &&
      allField.apartment.length > 0) ||
      (allField.privateHome &&
        (!allField.apartment || allField.apartment.length === 0)));

  useEffect(() => {
    isPrivateHomeValue && setValue("apartment", "");
  }, [isPrivateHomeValue]);

  const onSubmit: SubmitHandler<UpdateHomeData> = async (data) => {
    if (homeId) {
      data.uuid = userId;
      data.homeId = homeId;
      if (data.privateHome) {
        data.apartment = "";
        try {
          const response = await updateUserHome(data);
          reset();
          return response;
        } catch (error) {
          console.error("Error submitting data:", error);
          return;
        }
      }

      try {
        const response = await updateUserHome(data);
        reset();
        return response;
      } catch (error) {
        console.error("Error submitting data:", error);
        return;
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[300px] mt-5 sm:w-[435px] sm:mt-9"
      >
        <Input
          type="text"
          id="1"
          label="Назва помешкання (опційно)"
          inputClassName="w-[300px] sm:w-[435px] rounded-[20px] border text-xl p-5"
          error={errors.homeName}
          defaultValue={currentHome?.homeName}
          {...register("homeName")}
        />
        <Input
          type="text"
          id="2"
          label="Місто"
          inputClassName="w-[300px] sm:w-[435px] rounded-[20px] border text-xl p-5"
          defaultValue={currentHome?.city}
          disabled
          error={errors.city}
          {...register("city")}
        />
        <Input
          type="text"
          id="3"
          label="Вулиця"
          inputClassName="max-w-[300px] sm:max-w-[435px] rounded-[20px] border text-xl p-5"
          defaultValue={currentHome?.street}
          {...register("street")}
        />
        <div className="sm:flex">
          <Input
            type="text"
            id="4"
            label="Будинок"
            inputClassName={classNames("rounded-[20px] border text-xl p-5", {
              "w-[300px] sm:w-[205px] mr-[25px]": !isPrivateHomeValue,
              "w-[300px] sm:w-[435px]": isPrivateHomeValue,
            })}
            defaultValue={currentHome?.building}
            {...register("building")}
          />
          {!isPrivateHomeValue && (
            <Input
              type="text"
              id="5"
              label="Квартира"
              inputClassName="rounded-[20px] border text-xl p-5 w-[300px] sm:w-[205px]"
              defaultValue={currentHome?.apartment}
              {...register("apartment")}
            />
          )}
        </div>

        <CheckBox
          id="6"
          inputClassName="border text-xl p-5 accent-white border-black w-[30px] h-[30px]"
          label="В мене приватний будинок"
          labelClassName="pl-2 text-xl absolute top-0 select-none"
          defaultChecked={currentHome?.privateHome}
          {...register("privateHome")}
        />

        <div className="flex flex-col mt-5">
          <Button
            type="submit"
            text="Зберегти"
            disabled={
              isAllFieldFilled === undefined ? false : !isAllFieldFilled
            }
            className={classNames("border rounded-[20px] py-5", {
              "bg-none": isAllFieldFilled,
            })}
          />
          <RoutingBack
            text="Назад"
            classNameButton="border rounded-[20px] py-5 mt-4"
          />
        </div>
      </form>
    </div>
  );
};

export default EditHomeForm;
