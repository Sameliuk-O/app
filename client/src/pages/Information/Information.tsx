import { Block } from "@/components/ui/Block";

import { InformationLinkBlock } from "@/components/InformationLinkBlock";
import { oftenQuestion } from "@/constants/oftenQuestions.tsx";
import { InformationContainer } from "@/components/InformationContainer";

const Information = () => {
  return (
    <Block className="border-0 pb-5 px-0 lg:border lg:p-5">
      <InformationContainer
        headerText="Навчання"
        blockIcon="book"
        blockText="Пройти навчання користування сайтом"
        blockLink="#"
      />
      <InformationContainer
        headerText="Контакти"
        blockIcon="phone"
        blockText="Контакти комунальних підприємств"
        blockLink="contacts"
      />
      <section className="flex flex-col gap-y-5">
        <h2 className="text-xl text-gray500 my-2.5 sm:mx-3 lg:mx-6 lg:text-3xl">
          Часті питання
        </h2>
        {oftenQuestion.map((el) => (
          <InformationLinkBlock
            link={el.link}
            icon={el.icon}
            text={el.text}
            key={el.link}
          />
        ))}
      </section>
    </Block>
  );
};

export default Information;
