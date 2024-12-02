import { sendCounters } from "@/services/sendCounters.ts";
import { userStore } from "@/stores/userStore.ts";
import { ICounters } from "@/types/ICounters.ts";
import classNames from "classnames";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import {
  countersData,
  ICountersData,
  ICountersObject,
} from "@/constants/counterServiceFields.ts";
import { IServiceCountersBlock } from "@/types/IServiceCountersBlock.ts";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";

type FormValues = {
  [key: string]: string;
};

type Results = {
  [key: string]: number;
};

const ServiceCountersBlock = (props: IServiceCountersBlock) => {
  const {
    service,
    classNameButton,
    classNameDescription,
    classNameBlockDescription,
    displayTitle = true,
    serviceName,
    isSendAllData,
    setIsSendAllData,
  } = props;
  const countersFields = countersData.find((el) => el.service === service);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const homeServices = userStore((state) => state.homeServices) || [];
  const homeCounters = userStore((state) => state.homeCounters);
  const [results, setResults] = useState<Results>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const { homeId } = useParams<{ homeId: string }>();
  const currentService = homeServices.find((el) => el.serviceName === service);
  const setHomeCounters = userStore((state) => state.setHomeCounters) || [];
  const setNewHomeCounters = userStore((state) => state.setNewHomeCounters);

  useEffect(() => {
    if (isSendAllData) {
      reset();
      setIsSendAllData && setIsSendAllData(false);
    }
  }, [isSendAllData]);

  useEffect(() => {
    if (countersFields) {
      countersFields.counters.forEach((el) => {
        setValue(el.name, "");
        setValue(`previous_${el.name}`, "0");
      });
      reset();
    }
  }, [service, countersFields]);

  const watchAllFields = useWatch({
    control,
    defaultValue: useMemo(() => {
      const defaults: FormValues = {};
      countersFields?.counters.forEach((el) => {
        defaults[el.name] = "";
        defaults[`previous_${el.name}`] = "0";
      });
      return defaults;
    }, [countersFields]),
  });

  useEffect(() => {
    if (countersFields) {
      const newResults: Results = {};
      const newHomeCountersState: ICounters | Record<string, number> = {};

      countersFields.counters.forEach((el) => {
        const fieldName = el.name;
        const fieldValue = watchAllFields[fieldName];

        const previousValue = homeCounters?.[fieldName]
          ? Number(homeCounters[fieldName])
          : 0;

        const currentValue = fieldValue ? Number(fieldValue) : previousValue;

        const result = isNaN(currentValue) ? 0 : currentValue - previousValue;
        newResults[fieldName] = result < 0 ? 0 : result;

        newHomeCountersState[fieldName] = currentValue;
      });
      setResults(newResults);
      setNewHomeCounters(newHomeCountersState);
    }
  }, [watchAllFields, countersFields, homeCounters]);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      const filledData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) =>
          countersFields?.counters.some(
            (el) => el.name === key && value.trim() !== "",
          ),
        ),
      );

      const submitData = service &&
        currentService &&
        homeId && {
          ...filledData,
          homeId: +homeId,
          personalAccount: currentService.personalAccount,
        };

      if (submitData) {
        try {
          const response = await sendCounters(submitData);
          setHomeCounters(response);
          reset();
          setIsSuccess(true);
        } catch (e) {
          setIsSuccess(false);
        }
      }
    },
    [countersFields, reset, homeId, currentService, service],
  );

  const createServicePrevValueArray = (
    first: ICounters,
    second: ICountersData,
  ) => {
    return second.counters.map((counter: ICountersObject) => {
      const name = counter.name;
      const value = first[name];
      return { name, value };
    });
  };

  const resultArray =
    homeCounters &&
    countersFields &&
    createServicePrevValueArray(homeCounters, countersFields);

  const safeResultArray = Array.isArray(resultArray) ? resultArray : [];

  return (
    <section>
      {displayTitle && (
        <h3 className="text-gray800 text-2xl mt-9">Показники</h3>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        {countersFields &&
          countersFields.counters.map((el, index) => (
            <div
              key={`${el.type}-${countersFields.service}-${index}`}
              className="mb-4"
            >
              <div className="lg:flex text-gray400 text-xl">
                <div className="flex">
                  <Icon
                    imgUrl={el.icon}
                    imgAlt={countersFields.service}
                    classNameImg="mr-2.5"
                  />
                  <p className="mr-2.5 text-gray800">{el.type}</p>
                </div>

                <p className="pl-9">{el.number}</p>
              </div>
              <div className="xl:flex justify-between relative">
                <Input
                  type="text"
                  id={`${el.label + index + countersFields.service}`}
                  label={el.label}
                  inputClassName="w-full xl:w-[250px] rounded-[20px] border text-xl p-5"
                  error={errors[el.name]}
                  errorMessage="Для предачі показників дане поле є обовʼязковим"
                  {...register(el.name, { required: true })}
                />
                <div className="content-center 2xl:mx-5 text-6xl text-gray500 hidden xl:block">
                  -
                </div>
                <div className="flex justify-between gap-x-2">
                  <Input
                    type="text"
                    id={`previous_${index}`}
                    label="Попередній показник"
                    inputClassName="w-full xl:w-[250px] rounded-[20px] border text-xl p-5"
                    disabled
                    classNameInputBlock="flex-1"
                    defaultValue={
                      safeResultArray
                        ? safeResultArray.find(
                            (prevValue) => prevValue.name === el.name,
                          )?.value ?? "0"
                        : "0"
                    }
                    {...register(`previous_${el.name}`, {
                      value:
                        safeResultArray?.find(
                          (prevValue) => prevValue.name === el.name,
                        )?.value != null
                          ? safeResultArray
                              .find((prevValue) => prevValue.name === el.name)!
                              .value!.toString()
                          : "0",
                    })}
                  />
                  <div className="content-center  mx-1 2xl:mx-5 text-6xl text-gray500 hidden xl:block">
                    =
                  </div>
                  <Input
                    type="text"
                    id={`result_${index}`}
                    label="Різниця"
                    inputClassName="w-full xl:w-[250px] rounded-[20px] border text-xl p-5"
                    classNameInputBlock="flex-1"
                    disabled
                    value={results[el.name]?.toString() || "0"}
                    {...register(`result_${el.name}`)}
                  />
                </div>
              </div>
            </div>
          ))}
        <div
          className={classNameBlockDescription ? classNameBlockDescription : ""}
        >
          <Button
            type="submit"
            text="Передати показники"
            className={classNames(
              "text-2xl text-white w-full rounded-2xl py-5",
              {
                [`${classNameButton}`]: !!classNameButton,
              },
            )}
          />
          <p
            className={classNames("text-xl text-gray500 mt-2", {
              [`${classNameDescription}`]: !!classNameDescription,
            })}
          >
            {isSuccess
              ? `${serviceName} успішно прийняв ваші показники. Дякуємо, що ви обрали саме нас!`
              : "Просимо надавати показники з 10 і до кінця поточного місяця 30 (31) число."}
          </p>
        </div>
      </form>
    </section>
  );
};

export default ServiceCountersBlock;
