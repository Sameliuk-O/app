import classNames from "classnames";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUserHome } from "@/services/createUserHome.ts";
import { userStore } from "@/stores/userStore.ts";
import { Button } from "@/components/ui/Button";
import { CheckBox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import RoutingBack from "@/components/ui/RoutingBack/RoutingBack.tsx";

export type CreateHomeData = {
  homeName: string;
  city: string;
  street: string;
  building: string;
  apartment?: string;
  privateHome: boolean;
  uuid: string;
};

const CreateHomeForm = () => {
  const userId = userStore((state) => state.userId);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateHomeData>({
    defaultValues: {
      homeName: "",
      city: "Черкаси",
      street: "",
      building: "",
      apartment: "",
      privateHome: false,
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

  const onSubmit: SubmitHandler<CreateHomeData> = async (data) => {
    data.uuid = userId;
    if (data.privateHome) {
      data.apartment = "";
      try {
        const response = await createUserHome(data);
        reset();
        return response;
      } catch (error) {
        console.error("Error submitting data:", error);
        return;
      }
    }

    try {
      const response = await createUserHome(data);
      reset();
      return response;
    } catch (error) {
      console.error("Error submitting data:", error);
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:w-[435px] mt-5 sm:mt-9"
    >
      <Input
        type="text"
        id="1"
        label="Назва помешкання (опційно)"
        inputClassName="w-[300px] sm:w-[435px] rounded-[20px] border text-xl p-5"
        error={errors.homeName}
        {...register("homeName")}
      />
      <Input
        type="text"
        id="2"
        label="Місто"
        inputClassName="sm:w-[435px] rounded-[20px] border text-xl p-5"
        defaultValue="Черкаси"
        disabled
        error={errors.city}
        {...register("city")}
      />
      <Input
        type="text"
        id="3"
        label="Вулиця"
        inputClassName="sm:max-w-[435px] rounded-[20px] border text-xl p-5"
        {...register("street")}
      />
      <div className="sm:flex">
        <Input
          type="text"
          id="4"
          label="Будинок"
          inputClassName={classNames("rounded-[20px] border text-xl p-5", {
            "sm:w-[205px] sm:mr-[25px]": !isPrivateHomeValue,
            "sm:w-[435px]": isPrivateHomeValue,
          })}
          {...register("building")}
        />
        {!isPrivateHomeValue && (
          <Input
            type="text"
            id="5"
            label="Квартира"
            inputClassName="rounded-[20px] border text-xl p-5 sm:w-[205px]"
            {...register("apartment")}
          />
        )}
      </div>

      <CheckBox
        id="6"
        inputClassName="border text-xl p-5 accent-white border-black w-[30px] h-[30px] focus-ring-brand"
        label="В мене приватний будинок"
        labelClassName="pl-2 text-xl absolute top-0 select-none"
        defaultChecked={false}
        {...register("privateHome")}
      />

      <div className="flex flex-col mt-5">
        <Button
          type="submit"
          text="Зберегти"
          disabled={isAllFieldFilled === undefined ? false : !isAllFieldFilled}
          className={classNames("rounded-[20px] py-5 text-yellow600", {
            "!text-white": isAllFieldFilled,
          })}
        />
        <RoutingBack
          text="Назад"
          classNameButton="border rounded-[20px] py-5 mt-4 hover:bg-brand300 hover:text-white focus-ring-brand"
        />
      </div>
    </form>
  );
};

export default CreateHomeForm;
