import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getUserById } from "@/services/getUserById.ts";
import { updateUser } from "@/services/updateUser.ts";
import { userStore } from "@/stores/userStore.ts";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ProfileFormData {
  firstName: string;
}

const UserSettingBlock = () => {
  const userId = userStore((state) => state.userId);
  const setUser = userStore((state) => state.setUser);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "",
    },
  });

  const getUser = async () => {
    try {
      const fetchedUser = await getUserById(userId);
      setUser({ ...fetchedUser });
      if (fetchedUser) {
        reset({
          firstName: fetchedUser.first_name,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const updatedUser = await updateUser({ uuid: userId, ...data });
      if (updatedUser) {
        console.log("Updated user:", updatedUser);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <section className="border-b border-dashed pb-3 mb-3">
      <h1 className="text-xl text-gray500 lg:text-2xl">Персоналні дані</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="md:flex md:gap-x-4">
        <Input
          type="text"
          id="firstName"
          label="Ім'я"
          defaultValue=" "
          inputClassName="max-w-full md:w-[435px] rounded-[20px] border text-xl p-4 lg:p-5"
          {...register("firstName")}
        />
        <Button
          type="submit"
          text="Внести зміни"
          className="border rounded-[20px] md:max-w-[205px] py-4 mt-2 w-full text-xl md:my-8"
        />
      </form>
    </section>
  );
};

export default UserSettingBlock;
