import { Button } from "@/components/ui/Button";
import { CheckBox } from "@/components/ui/Checkbox";
import { DateField } from "@/components/ui/DateField";
import { Input } from "@/components/ui/Input";
import { createService } from "@/services/addService.ts";
import { IAddServiceForm } from "@/types/IAddServiceForm";
import { providersField } from "@/constants/providersField";
import { ICreateService } from "@/types/ICreateService.ts";
import {
  useForm,
  FieldValues,
  FieldError,
  SubmitHandler,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RoutingBack } from "../../ui/RoutingBack";

const AddServiceForm = (props: IAddServiceForm) => {
  const { provider, homeId, userId } = props;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const providerField = providersField[provider];
  console.log(provider);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const serviceData: ICreateService = {
      userId,
      homeId,
      month: data?.date?.month,
      year: data?.date?.year,
      ...data,
    };

    if (provider) {
      try {
        const response = await createService({ data: serviceData, provider });
        reset();
        navigate(`/home/edit/${homeId}`);
        return response;
      } catch (error) {
        console.error("Error submitting data:", error);
        return;
      }
    }
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:max-w-[435px] mt-5 sm:mt-9"
    >
      {Object.entries(providerField).map(([key, field]) => (
        <div key={key}>
          {field.type === "checkbox" && (
            <CheckBox
              id={key}
              inputClassName="border text-xl p-5 accent-white border-black w-[30px] h-[30px]"
              label={field.label}
              labelClassName="pl-2 text-xl absolute top-0 select-none"
              defaultChecked={false}
              {...register(key)}
            />
          )}

          {key === "date" && (
            <DateField
              type={field.type}
              id={key}
              inputClassName="sm:w-[435px] rounded-[20px] border text-xl p-5"
              error={errors[key] as FieldError | undefined}
              defaultValue=""
              {...register(key, {
                required: "Required",
                pattern: {
                  value: field.validation,
                  message: "",
                },
              })}
            />
          )}
          {["text", "email", "phone", "number"].includes(field.type) && (
            <Input
              type={field.type}
              id={key}
              label={field.label}
              inputClassName="sm:w-[435px] rounded-[20px] border text-xl p-5"
              error={errors[key] as FieldError | undefined}
              defaultValue=""
              {...register(key, {
                required: "Required",
                pattern: {
                  value: field.validation,
                  message: "",
                },
              })}
            />
          )}
          {key === "description" && (
            <p className="mt-5 text-gray-500 text-lg sm:text-xl">
              {providerField.description}
            </p>
          )}
        </div>
      ))}
      <div className="flex flex-col mt-5 sm:mt-10">
        <Button
          type="submit"
          text="Зберегти"
          className="border rounded-[20px] py-5"
        />
        <RoutingBack
          text="Назад"
          classNameButton="border rounded-[20px] py-5 mt-4"
        />
      </div>
    </form>
  );
};

export default AddServiceForm;
