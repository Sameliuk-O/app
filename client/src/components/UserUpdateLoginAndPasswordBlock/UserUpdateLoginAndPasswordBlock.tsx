import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { updatePassword } from "@/services/updatePassword.ts";
import { updateUserEmail } from "@/services/updateUserEmail.ts";
import { userStore } from "@/stores/userStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import apple from "@/assets/images/appleIcon.svg";
import google from "@/assets/images/googleIcon.svg";
import facebook from "@/assets/images/facebookIcon.svg";

interface IUpdateEmail {
  editEmail: string;
}

const UserUpdateLoginAndPasswordBlock = () => {
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const userId = userStore((state) => state.userId);

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      editEmail: user?.email || "",
    },
  });

  useEffect(() => {
    user?.email && setValue("editEmail", user.email);
  }, [user?.email]);

  const onSubmitEmail = async (data: IUpdateEmail) => {
    try {
      const response = await updateUserEmail({
        email: data.editEmail,
        uuid: userId,
      });

      setUser({ ...response });
      reset();
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const onSubmitPassword = async () => {
    await updatePassword();
  };

  const addSocialMedia = (value: string) => {
    console.log("Adding social media:", value);
  };

  return (
    <section className="pb-6 border-b border-dashed border-gray300 mb-6">
      <h2 className="text-xl text-gray500 lg:text-2xl">Логін та безпека</h2>
      <form
        onSubmit={handleSubmit(onSubmitEmail)}
        className="md:flex md:gap-x-4"
      >
        <Input
          type="text"
          id="editEmail"
          label="Логін"
          defaultValue=" "
          classNameInputBlock="sm:my-2"
          {...register("editEmail")}
          inputClassName="max-w-full md:w-[435px] rounded-[20px] border text-xl p-4 lg:p-5"
        />
        <Button
          type="submit"
          text="Змінити пошту"
          className="border rounded-[20px] py-5 mt-2 w-full h-[70px] md:max-w-[205px] hover:bg-greenLight sm:my-2 md:my-8 md:text-xl"
        />
      </form>

      <form onSubmit={handleSubmit(onSubmitPassword)}>
        <Button
          type="submit"
          text="Змінити пароль"
          className="border rounded-[20px] py-4 mt-2 w-full h-[70px] md:w-[654px] hover:bg-greenLight sm:my-2 md:my-2.5"
        />
      </form>
      <p className="mt-5 text-gray500 text-lg">
        Зв‘яжіть обліковий запис Comunapp з обліковими записами соцмереж і
        заходьте на сайт, як користувач Google, Apple чи Facebook
      </p>

      <div className="flex flex-col gap-y-2 mt-5 md:flex-row md:justify-between md:gap-x-5">
        <button
          className="flex border rounded-2xl border-gray300 p-5 hover:bg-greenLight md:max-w-[280px] basis-1/3 focus-ring-brand"
          onClick={() => addSocialMedia("google")}
        >
          <Icon imgUrl={google} imgAlt="google" classNameImg="mr-3" />
          <div className="text-left">
            <p className="text-red600">Зв‘язати з акаунтом</p>
            <p>Google</p>
          </div>
        </button>
        <button
          className="flex border rounded-2xl border-gray300 p-5 hover:bg-greenLight md:max-w-[280px] basis-1/3 focus-ring-brand"
          onClick={() => addSocialMedia("apple")}
        >
          <Icon imgUrl={apple} imgAlt="apple" classNameImg="mr-3" />
          <div className="text-left">
            <p className="text-green700">Зв‘язати з акаунтом</p>
            <p>Apple</p>
          </div>
        </button>
        <button
          className="flex border rounded-2xl border-gray300 p-5 hover:bg-greenLight md:max-w-[280px] basis-1/3 focus-ring-brand"
          onClick={() => addSocialMedia("facebook")}
        >
          <Icon imgUrl={facebook} imgAlt="facebook" classNameImg="mr-3" />
          <div className="text-left">
            <p className="text-green700">Зв‘язати з акаунтом</p>
            <p>Facebook</p>
          </div>
        </button>
      </div>
    </section>
  );
};

export default UserUpdateLoginAndPasswordBlock;
