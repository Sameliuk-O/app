import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { addUserToHome } from "@/services/addUserToHome.ts";
import { IAddUserToHomeForm } from "@/types/IAddUserToHomeForm.ts";
import {
  FieldError,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const AddUserToHomeForm = (props: IAddUserToHomeForm) => {
  const { homeId, userId, setIsAddedNewUser, setIsModal } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const serviceData = {
      homeId,
      userId,
      email: data.email,
    };

    try {
      const response = await addUserToHome({ data: serviceData });
      reset();
      setIsAddedNewUser && setIsAddedNewUser(true);
      setIsModal && setIsModal(false);
      return response;
    } catch (error) {
      console.error("Error submitting data:", error);
      return;
    }
  };

  return (
    <div>
      <p className="text-xl text-gray600">
        Ви можете додати користувача до вашого помешкання ввівши його email
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          id="1"
          label="Пошта Користувача"
          inputClassName="w-full rounded-[20px] border text-xl p-5"
          error={errors[1] as FieldError | undefined}
          defaultValue=""
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "",
            },
          })}
        />
        <Button
          type="submit"
          text="Запросити"
          className="border rounded-[20px] w-full py-5"
        />
      </form>
    </div>
  );
};

export default AddUserToHomeForm;
