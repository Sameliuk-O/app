import { Switch } from "@/components/ui/Switch";
import { useState } from "react";

const SettingPushMessage = () => {
  const [isCheckedEmailPush, setIsCheckedEmailPush] = useState(false);
  const [isCheckedPushMessage, setIsCheckedPushMessage] = useState(false);

  return (
    <section className="border-b border-dashed pb-6 mb-6">
      <h2 className="text-xl text-gray500 lg:text-2xl">Сповіщення</h2>
      <div className="mt-5">
        <div className="flex">
          <Switch
            setIsChecked={setIsCheckedEmailPush}
            isChecked={isCheckedEmailPush}
            className=""
            id="emailPush"
          />
          <p className="text-lg">Електронна пошта</p>
        </div>
        <p className="text-gray800 lg:text-lg">
          Повідомлення, які надходять на вашу електронну пошту.
        </p>
      </div>
      <div className="mt-5">
        <div className="flex">
          <Switch
            setIsChecked={setIsCheckedPushMessage}
            isChecked={isCheckedPushMessage}
            className=""
            id="messagePush"
          />
          <p className="text-lg">Push-повідомлення</p>
        </div>
        <p className="text-gray800 lg:text-lg">
          Короткі повідомлення, які з'являються на екрані вашого смартфону або
          планшету.
        </p>
      </div>
      <p className="mt-5 text-gray800 lg:text-lg">
        <span className="text-brand400">Порада:</span> Щоб не пропустити важливі
        сповіщення, рекомендується увімкнути всі типи повідомлень.
      </p>
    </section>
  );
};

export default SettingPushMessage;
